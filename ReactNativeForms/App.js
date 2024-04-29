import React from 'react';
import {Text, View, StyleSheet, StatusBar, SafeAreaView, TextInput, Switch} from 'react-native';
import { useState } from 'react';

const App = () => {
  const [text, setText] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  return (
    <SafeAreaView
      style={styles.container}>
        <TextInput style={styles.input} value={text} onChangeText={setText} />
        <Text>text is: {text}</Text>
        <TextInput style={[styles.input, styles.multilineText]} placeholder='I am a placeHolder' multiline/>
        <View style={styles.switchContainer}>
          <Text style={styles.textSyle}>Dark Mode</Text>
          <Switch value={isDarkMode} onValueChange={() => setIsDarkMode((previousState) => !previousState)} />
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: StatusBar.currentHeight,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: '80%'
  },
  multilineText: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10
  },
  textSyle: {
    marginRight: 10,
  }
});
export default App;