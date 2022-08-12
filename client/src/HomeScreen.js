import * as React from 'react';
import { View, Text, Image } from 'react-native';
import MyButton from '../components/MyButton';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import styles from './styles/MainStyle';
import logo from '../assets/gergarage.png';


export default function HomeScreen({navigation}) { //first navigation page
  const onBooking = () =>{
    navigation.navigate("Login") 
  }
  const onSeeBooking = () =>{
    navigation.navigate("SignUp")
  }
// these two bottom were created to the Home page
  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <Image source={logo} />
        <Title>Ger GARAGE</Title>
      </View>
      <MyButton title="Login" onPress={()=> onBooking()}/>
      <MyButton title="SignUp" onPress={()=> onSeeBooking()}/>
    </View>
  );
}





