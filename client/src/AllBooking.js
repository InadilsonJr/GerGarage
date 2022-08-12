import {Alert, Text,View} from "react-native";
import * as React from 'react';
import { KeyboardAvoidingView } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import styles from "./styles/MainStyle";
import { Input, Button } from "react-native-elements";
import { useState } from "react";
import {FontAwesome5 } from '@expo/vector-icons';
import { Platform } from "react-native";
import bookingService from "./services/bookingService";

export default function ViewAllBookings(){

const [allBookings, setAllBookings] = useState(null) 

const viewBookings = ()=> {

//getting the reponse from the userservice and storing into allBookings
    bookingService.findAll()
    .then((response) => {
        setAllBookings(response.data);
        console.log(allBookings)
        Alert.alert("Success", "Showing all bookings.");

    }).catch((error) => {
        Alert.alert("Error", "Try Again!");
    });
}

return (
    <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}

        keyboardVerticalOffset={80}>
        <ScrollView style={styles.specificContainer}>
            <Text style={styles.text}>View Services</Text>
          
            <Button
                icon={<FontAwesome5 name="check" size={15} color="white" />}
                title={"allBookings"}
                onPress={() => viewBookings()}
            />
         {/* showing the information as a text on the screen */}
                <Text >{JSON.stringify(allBookings, null, ' ').replaceAll("label", "\n") .replaceAll("addCost", "Extra Items").replaceAll("cost", "Cost").replaceAll("enginee_type", "Enginee").replaceAll("status", "Status").replaceAll("id", "Service ID").replaceAll("mechanic", "Mechanic").replaceAll("serviceType", "Service").replaceAll("license", "License").replaceAll("vehicle_type", "Vehicle").replaceAll("{", " ").replaceAll("}", " ").replaceAll( '"' , " ").replaceAll( "[", " ").replaceAll( "]", " ").replaceAll( ",", " ").replaceAll(/\\/g, ' ').replaceAll("date", "Date").replaceAll("time", "Time") + "\n" + "\n"}</Text>

               
              
        </ScrollView>
    </KeyboardAvoidingView>
)

}