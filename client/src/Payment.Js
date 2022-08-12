import bookingScreen from "./src/bookingScreen";
import {Alert, Text,View} from "react-native";
import * as React from 'react';
import { KeyboardAvoidingView } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import styles from "../styles/appStyles";
import { Input, Button } from "react-native-elements";
import { useState } from "react";
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Payments({route}){

    const email = route.params;
    const name = route.params.userName;
    const phone = route.params?.phone;

    console.log(name)
    console.log(phone)

    const [Bookings, setBookings] = useState("Click to check your invoice!") //creating const to store the value we get from the server
    const payments = ()=> {
    //getting the reponse from the bookservice and storing into allBookings
        userService.payment()
        .then((response) => {
            setBookings(response.data);
            Alert.alert("Success", "Pleace check your invoice.");
    
        }).catch((error) => {
            Alert.alert("Error", "Try Again!");
        });
    }

    const styles = StyleSheet.create({
        btn: {
          height: 20,
        },
        container: {
          backgroundColor: "white",
          flex: 1,
        },
        logoContainer: {
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        },
        logo: {
          width: 100,
          height: 100,
          resizeMode: "contain",
        },
        dateConatiner: {
          width: 350,
        },
      });
      var number1 = parseInt('10')
    
    
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
    
            keyboardVerticalOffset={80}>
            <ScrollView style={styles.specificContainer}>
                <Text style={styles.text}>Payment</Text>
              
           
            
             {/* showing customer informations on the screen */}
             <Text>{"\n" + "Customer name: " +name + "\n" + "Phone Number: " + phone + "\n" + "\n" + "Your invoices:" }</Text>
             <Text >{JSON.stringify(Bookings, ['vehicle_type','license', 'serviceType','cost', 'addCost'], " ").replaceAll("addCost", "Extra items").replaceAll("cost", "Cost €").replaceAll("serviceType", "Service").replaceAll("license", "License").replaceAll("vehicle_type", "Vehicle").replaceAll("{", " ").replaceAll("}", " ").replaceAll( '"' , " ").replaceAll( "[", " ").replaceAll( "]", " ").replaceAll( ",", " ").replaceAll(/\\/g, ' ').replaceAll("label", "\n") + "\n" + "\n"}</Text>
                {/* this button call our function to request the information */}
                <Button
                    icon={<Icon name="check" size={15} color="white" />}
                    // buttonStyle={specificStyle.button}
                    title={" Invoices"}
                    onPress={() => payments()}
                />
            
            </ScrollView>
        </KeyboardAvoidingView>
    )


    }