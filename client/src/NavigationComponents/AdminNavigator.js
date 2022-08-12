import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import AdminScreen from '../AdminScreen';
import ViewAllBookings from '../AllBooking';


const Stack = createStackNavigator();


export default AdminNavigator = () => (
    <Stack.Navigator initialRouteName={"AdminScreen"}>
        <Stack.Screen name="AdminScreen" component={AdminScreen} />
        {<Stack.Screen name="AllBookings" component={ViewAllBookings} />}
    </Stack.Navigator>)