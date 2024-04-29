import React from 'react';
import { Text, View, TextInput, Button, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useState } from 'react';

const App = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [erros, setErrors] = useState({});

  const validate = () => {
    let errors = {};
    if(!userName){
      errors.userName = "Username is required";
    }
    if(!password){
      errors.password = "Password is required";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  const handleLogin = () => {
    if(validate()){
      console.log("Logged in", userName, password);
      setErrors({});
      setUserName("");
      setPassword("");
    }
  }
  return (
    <KeyboardAvoidingView behavior='padding'
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      style={styles.container}>
      <View style={styles.form}>

        <Text style={styles.formLabel}>Usename:</Text>
        <TextInput
        style={styles.formInput}
        placeholder="username"
        value={userName}
        onChangeText={setUserName} />

        {
          erros.userName ? <Text style={styles.formErrorText}>{erros.userName}</Text> : null
        }

        <Text style={styles.formLabel}>PassWord:</Text>
        <TextInput
        style={styles.formInput}
        placeholder="password" 
        secureTextEntry
        value={password}
        onChangeText={setPassword}/>
        {
          erros.password ? <Text style={styles.formErrorText}>{erros.password}</Text> : null
        }
        <Button style={styles.formButton} title="Login" onPress={handleLogin}/>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  form: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  formLabel: {
    fontSize: 16,
    marginBottom: 5
  },
  formInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    height: 40,
  },
  formButton: {
    backgroundColor: "blue",
    color: "white",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  formErrorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
  },
});

export default App