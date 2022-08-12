import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import HomeScreen from '../HomeScreen';
import LoginScreen from '../LoginScreen';
import SignUpScreen from '../SignUpScreen';


const Stack = createStackNavigator();


export default UnauthNavigator = () => (
    <Stack.Navigator initialRouteName="Booking">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>)