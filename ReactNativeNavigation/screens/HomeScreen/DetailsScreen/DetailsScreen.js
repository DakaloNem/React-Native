import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const DetailsScreen = () => {
 return (
   <View style={styles.container}>
     <Text style={styles.text}>Hello World!</Text>
   </View>
 );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: '#fff',
   alignItems: 'center',
   justifyContent: 'center'
 },
 text: {
   fontSize: 24,
   fontWeight: "bold",
   marginBottom: 16, 
 },
});

export default DetailsScreen;