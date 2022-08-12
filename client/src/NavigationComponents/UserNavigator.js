import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import BookingScreen from '../BookingScreen';
import MenuScreen from '../MenuScreen';


const Stack = createStackNavigator();


export default UserNavigator = () => (
    <Stack.Navigator initialRouteName="Booking">
        <Stack.Screen name="Menu" component={MenuScreen} />
        <Stack.Screen name="Booking" component={BookingScreen} />
    </Stack.Navigator>)