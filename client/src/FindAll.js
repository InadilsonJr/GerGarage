import React, { useState, Component } from "react";
import { render } from "react-dom";
import moment from "moment";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
  Image,
  Alert,
} from "react-native";
import DatePicker from "react-native-neat-date-picker"; 
import { Input, Text, Button, CheckBox } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";
import bookingServices from "../service/bookingService";
import userServices from "../service/userService"; 
import DateTimePicker from "@react-native-community/datetimepicker";
import styles from "../style/MainStyle";


const FindAll = ({ navigation }) => {
 const [informBooking, setinformBooking] = useState(''); //username started with null

  const findAllBooking = () => {
    // after click in save set

    // if the validation is ok, it will save
    
   
    bookingServices
      .findAll()
      .then((response) => {
        setinformBooking(response.data);
        
        Alert.alert("SUCCESS!", "All booking displayed.");
      }) // if correct , get the response will be "Success"
      .catch((error) => {
        Alert.alert("ERRO!", "When displayed Booking.");
        console.log(error);
      }); //if incorrect the response
  };
  //Layout settings
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


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"} //here i am creating the behaviour of the keyboard to avoid the keyboard on text.
      style={[styles.container, specificStyle.specificContainer]}
      keyboardVerticalOffset={50} //to help me to avoid the keyboard above my text
    >
      <Text>See all booking</Text>
      <ScrollView keyboardShouldPersistTaps="handled">
      <View style={styles.logoContainer}>
        <Image source={require("../logo/booking.png")} style={styles.logo} />
      </View>

      <Button
          icon={<Icon name="check" size={15} color="white" />} //put a button on my screen
          title=" All booking"
          buttonStyle={specificStyle.button}
          onPress={() => findAllBooking()}
        />
  
       
        <Text>{JSON.stringify(informBooking, 'id',' ')}</Text>
       
    
     
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const specificStyle = StyleSheet.create({
  specificContainer: {
    backgroundColor: "#fff",
    padding: 10,
  },
  button: {
    alignItems: "center",
    padding: 10,
    marginTop: 16,
    marginLeft: 130,
    marginRight: 130,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
});

export default FindAll;