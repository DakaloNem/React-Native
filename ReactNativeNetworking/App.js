import React from 'react';
import { 
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  StatusBar,
  FlatList,
  ScrollView,
  ActivityIndicator,
  TextInput,
  Button } from 'react-native';
import { useState, useEffect } from 'react';

const App = () => {
  
  const [listData, setListData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [errors, setErrors] = useState("");
  
  const fetchData = async (limit = 10) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}`);
      const data = await response.json();
      setListData(data);
      setIsLoading(false);
      setErrors("");
    } catch (error) {
      setErrors("Error when fetching data");
      setIsLoading(false);
      console.log(error);
    }
    
  };

  const postData = async () => {
    try{
    setIsPosting(true);
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: postTitle,
        body: postBody,
      }),
    });
    const data = await response.json();
    setListData([data, ...listData]);
    setIsPosting(false);
    setPostTitle("");
    setPostBody("");
    setErrors("");
    } catch (error) {
    console.log(error);
    setErrors("Error when adding a post");
    isLoading(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchData(20);
    setRefreshing(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return (
    <SafeAreaView style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text>Loading...</Text>
    </SafeAreaView>);
  }
  return (
    <SafeAreaView style={styles.container}>
      {
        errors ?(
        <View style={styles.errorsContainer}>
          <Text style={styles.errorsText}>
            {errors}
          </Text>
        </View>
          ) :(
          <>
          <View style={styles.inputContainer}>
            <Text style={styles.title}>Post List</Text>
            <TextInput
              style={styles.input}
              placeholder='Post title'
              value={postTitle}
              onChangeText={setPostTitle}/>
    
            <TextInput
              style={styles.input}
              placeholder='Post Body'
              value={postBody}
              onChangeText={setPostBody}/>
              <Button
              title={isPosting ? 'Posting...' : 'Add Post'}
              style={styles.button}
              onPress={postData}
              disabled={isPosting}/>
          </View>
          <View style={styles.listContainer}>
          <FlatList 
            data={listData}
            renderItem={({ item }) => {
              return (
                <View style={styles.card}>
                  <Text style={styles.titleText}>{item.title}</Text>
                  <Text style={styles.bodyText}>{item.body}</Text>
                </View>
              );
            }}
            ItemSeparatorComponent={() =>{
              return(<View style={styles.flatListSeparator}/>);
            }}
            ListEmptyComponent={<Text style={styles.listEmptyText}>No Post Found</Text>}
            ListHeaderComponent={<Text style={styles.listHeaderText}>Post List</Text>}
            ListFooterComponent={<Text style={styles.listFooterText}>End of List</Text>}
            refreshing={refreshing}
            onRefresh={handleRefresh}/>
          </View>
          </>
        )
      }

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: StatusBar.currentHeight
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  bodyText: {
    fontSize: 16,
    color: "#666666"
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  inputContainer: {
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  flatListSeparator: {
    height: 16,
  },
  listHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    paddingLeft: 5,
  },
  listFooterText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    paddingLeft: 5,
  },
  listEmptyText: {
    fontSize: 18,
    marginBottom: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorsContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorsText:{
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default App