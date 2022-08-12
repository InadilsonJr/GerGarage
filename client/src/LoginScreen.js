import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Input, Button } from 'react-native-elements';
import { StyleSheet, Text, View, Image, } from 'react-native';
import logo from '../assets/gergarage.png';
import AsyncStorage from "@react-native-async-storage/async-storage";
import userService from "./services/userService";
import { connect } from 'react-redux';
import { userActions } from './redux';

function LoginScreen(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const onLogin = () => {
    userService.login({
      email: username,
      password
    }) 
      .then(response => {
        console.log(response.data, response.data.isAdmin)
        AsyncStorage.setItem("TOKEN", response.data.access_token) //authentication to the login
        AsyncStorage.setItem("ID", response.data.id.toString()) // permit differents access depeding of the id
        props.login({ username, password, isAdmin: response.data.isAdmin });
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.Text}>Ger Garage</Text>
      <StatusBar style="auto" />

      <Image style={{ width: 250, height: 180, marginBottom: 20 }} source={logo} />

      <Input placeHolder="username" style={styles.TextInput} onChangeText={txt => setUsername(txt)} defaultValue={username} />
      <Input secureTextEntry={true} placeHolder="password" style={styles.TextInput} onChangeText={txt => setPassword(txt)} defaultValue={password} />
      <Button title="Login" onPress={() => onLogin()} />
    </View>
  );
}

const mapStateToProps = (props) => {
  return {
    loggedIn: props.global.loggedIn,
    isAdmin: props.global.isAdmin,
    loading: props.global.loading,
  };
};

const mapDispatchToProps = {
  setLoading: userActions.loading,
  login: userActions.login
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8bf4e6',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  TextInput: {
    width: '100%',
    height: 40,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingLeft: 10,
    marginBottom: 10

  }

});

