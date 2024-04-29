import React from 'react';
import {Text, View, StyleSheet, StatusBar, ScrollView, SafeAreaView, FlatList} from 'react-native';
import animeList from './Data/data.json'

const App = () => {
  return (
    <SafeAreaView
      style={styles.container}>
        <StatusBar barStyle="default" />
        {/* <ScrollView style={styles.scrollview}>
      {
        animeList.map(anime => {
          return (
            <View key={anime.id} style={styles.card}>
              <Text numberOfLines={1} ellipsizeMode='tail' style={styles.text}>
                Name: {anime.title.text}
              </Text>
              <Text>Hype: {anime.hype}</Text>
            </View>
          )
        })
      }
      </ScrollView> */}
      <FlatList
        data={animeList}
        renderItem={({item}) => (
          <View style={styles.card}>
            <Text numberOfLines={1} ellipsizeMode='tail' style={styles.text}>
              Name: {item.title.text}
            </Text>
            <Text>Hype: {item.hype}</Text>
          </View>
        )}
      />
    </SafeAreaView> 
  );
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#f5f5f5',
    paddingTop: StatusBar.currentHeight,
  },
  text: {
    maxWidth: 100,
  },
  scrollview: {
    paddingHorizontal: 20
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderWidth: .25,
    marginBottom: 16,
  }
});
export default App;