import React, { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { KeyboardAvoidingView } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import styles from "./styles/MainStyle";
import { Input, Button } from "react-native-elements";
import { useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { Alert } from "react-native";
import { Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import RNPickerSelect from "react-native-picker-select";
import FormContainer from "../components/FormContainer";
import Title from "../components/Title";
import MyInput from "../components/MyInput";
import MyButton from "../components/MyButton";
import { connect } from 'react-redux';
import { userActions } from './redux';
import bookingService from "./services/bookingService";
 

function BookingScreen(props) {


  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => <TouchableOpacity style={{ padding: 5 }} onPress={() => { props.logout() }} >
        <Text>Logout</Text>
      </TouchableOpacity>
    })
    return () => {

    }
  }, [props.navigation])

  // defining all the const we need to save the information entered by the user.

  const [name, setName] = useState(null);

  const [mobile, setMobile] = useState(null);
  const [serviceType, setServiceType] = useState(null);
  const [vehicle_type, setVehicle_type] = useState(null);
  const [otherType, setOtherType] = useState(null);
  const [comment, setComment] = useState(null);
  const [errorOtherType, setErrorOtherType] = useState(null);
  const [license, setLicense] = useState(null);
  const [enginee_type, setEnginee_type] = useState(null);
  const [date, setDate] = useState(new Date(Date.now()));
  const [time, setTime] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [errorServiceType, setErrorServiceType] = useState(null);
  const [errorVehicle_type, setErrorVehicle_type] = useState(null);
  const [errorLicense, setErrorLicense] = useState(null);
  const [errorEnginee_type, setErrorEngine_type] = useState(null);
  const [errorDate, setErrorDate] = useState(null);
  const [errorTime, setErrorTime] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const formData = {
    name,
    mobile,
    serviceType,
    vehicle_type,
    license,
    enginee_type,
    date,
    time,
    comment,
    status: "Booked",
  };
  const openDatePicker = () => {
    setShowDatePicker(true);
    console.log("datepicker");
  };

  const onCancel = () => {
    setShowDatePicker(false);
  };

  const onConfirm = (date) => {
    var weekDay = [ // works days
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    //sundays its not available
    if (weekDay[date.getDay()] == "Sunday") {
      Alert.alert("Date Unavailable.", "We closed on Sundays!");
    } else {
      setShowDatePicker(false);
      console.log(
        date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
      );
      setDate(
        date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
      );
      setErrorDate(null);
    }
  };
  const onTime = (time) => {
    setShowTimePicker(false);
    setTime(time);
    setErrorTime(null);
  };

  const typeService = (serviceType) => {
    setShowTimePicker(false);
    console.log(serviceType);
    setServiceType(serviceType);
    setErrorServiceType(null);
  };

  const typeEnginee = (enginee_type) => {
    setShowTimePicker(false);
    console.log(enginee_type);
    setEnginee_type(enginee_type);
    setErrorEngine_type(null);
  };

  // this cosnt will set the vehicle_type, or other depends on what the user will choose.
  const typeVehicle = (vehicle_type) => {
    if (vehicle_type == "Other") {
      setShowTimePicker(false);
      setOtherType(vehicle_type);
      setErrorVehicle_type(null);
    } else {
      setShowTimePicker(false);
      setVehicle_type(vehicle_type);
      setErrorOtherType(null);
    }
  };

  const checkData = () => {
    let error = false;
    setErrorServiceType(null);

    setErrorEngine_type(null);
    setErrorLicense(null);
    console.log(serviceType, enginee_type, license)
    if (serviceType == null) {
      setErrorServiceType("Please enter the service");
      error = true;
    }

    if (enginee_type == null) {
      setErrorEngine_type("Please enter the enginee type");
      error = true;
    }
    if (license == null) {
      setErrorLicense("Please enter the license");
      error = true;
    }
    return !error;
  };

  const saveBooking = () => {
    if (checkData()) {
      setLoading(true);
      // data that will be send to the back-end
      let data= {
        name,
        mobile,
        serviceType,
        vehicle_type,
        license,
        enginee_type,
        date,
        time,
        comment,
        status: "Booked"
      }
     
      bookingService.Booking(data)
          .then((response) => {
             setLoading(false)
          .catch((e)=>{
            console.log(e)
            })

       })
      .catch((error) => {
        setLoading(false)
        console.log(error)
      });
    } else{
      console.log("error check data")
    }
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };
  function chooseDate() {
    var isSunday = date.getDay() === 0;
    return (
      <View style={styles.containerDatePicker}>
        <View>
          {isSunday ? ( // error message 
            <Text style={styles.inputError}>
              Our garage are closed on Sundays. Please Select a new date.
            </Text>
          ) : (
            <Text style={styles.text}>{date.toUTCString()}</Text>
          )}
        </View>

        {showDatePicker && (
          <View>
            <DateTimePicker
              mode={"date"}
              minimumDate={new Date()}
              display="spinner"
              onChange={onChangeDate}
              value={date}
            />
            <MyButton
              // buttonStyle={specificStyle.button}
              title={"Save Date"}
              onPress={onCancel}
              disabled={isSunday} // you can't book on sundays 
            />
          </View>
        )}

        {!showDatePicker && (
          <MyButton
            icon={<FontAwesome5 name="calendar" size={17} color="white" />}
            // buttonStyle={specificStyle.button}
            title={"Date"}
            onPress={openDatePicker}
          />
        )}
      </View>
    );
  }
  function chooseTime() {
    
    return (
      <View
        style={{
          padding: 10,
          marginBottom: 10,
          marginLeft: 10,
          marginRight: 15,
          backgroundColor: "white",
        }}
      >
        <RNPickerSelect
          style={styles.maskedInput}
          placeholder={{ label: "Slots Available", value: null }}
          onValueChange={onTime}
          items={[
            { label: "08:00am", value: "08:00am" }, // 3 differensts cars per slot
            { label: "10:00am", value: "10:00pm" },
            { label: "02:00pm", value: "02:00pm" },
            { label: "04:00pm", value: "04:00pm" },
            { label: "06:00pm", value: "06:00pm" },
          ]}
        />
      </View>
    );
    // }
  }

  // creating a function to show a input when the user wants to input other vehicle
  function otherVehicle() {
    //  otherType variable will be set in vehicle_type
    if (otherType == "Other") {
      return (
        <MyInput
          placeholder="Vehicle"
          onChangeText={(value) => {
            setVehicle_type(value);
            setErrorVehicle_type(null);
          }}
          errorMessage={errorVehicle_type}
        />
      );
    }
  }

  return (
    <FormContainer>
      <ScrollView>
        <Title>Book your appointment</Title>
        <MyInput
          placeholder="Name" // name of the user
          underlineColorAndroid={"transparent"}
          onChangeText={(text) => {
            formData.name = text;
          }}
          defaultValue={formData.name}
        // errorMessage={"errou!!"}
        />
        <MyInput
          style={styles.TextInput}
          placeholder="Mobile" // contact of the user
          underlineColorAndroid={"transparent"}
          onChangeText={(text) => {
            formData.mobile = text;
          }}
          defaultValue={formData.mobile}
        />
        <View
          style={{
            padding: 10,
            marginLeft: 10,
            marginRight: 15,
            backgroundColor: "white",
          }}
        >
          <RNPickerSelect
            style={styles.pickerInput}
            placeholder={{ label: "Select vehicle Type", value: null }}
            onValueChange={typeVehicle}
            items={[ // vehicles availiable to book a service - 34 vehicles in total
              { label: "VolVo S60", value: "VolVo S60" },
              { label: "Volvo XC40", value: "Volvo XC40" },
              { label: "Volvo XC90 Hybrid", value: "Volvo XC90 Hybrid" },
              { label: "Jeep Compass", value: "Jeep Compass" },
              { label: "Jeep Renegade", value: "Jeep Renegade" },
              { label: "Range Rover Discovery", value: "Range Rover Discover" },
              { label: "Range Rover Defender", value: "Range Rover Defender" },
              { label: "Range Rover Evoque", value: "Range Rover Evoque" },
              { label: "Range Rover Velar", value: "Range Rover Velar" },
              { label: "Citroen C3", value: "Citroen C3" },
              { label: "Citroen Berlingo", value: "Citroen Berlingo" },
              { label: "Citroen SpaceTourer", value: "Citroen SpaceTourer" },
              { label: "Citroen E-Berlingo", value: "Citroen E-Berlingo" },
              { label: "Volkswagen Polo", value: "Volkswagen Polo" },
              { label: "Volkswagen Golf", value: "Volkswagen Golf" },
              { label: "Volkswagen ID.3", value: "Volkswagen ID.3" },
              { label: "Volkswagen ID.5", value: "Volkswagen ID.5" },
              { label: "Volkswagen T-Roc R", value: "Volkswagen T-Roc R" },
              { label: "Volkswagen Passat", value: "Volkswagen Passat" },
              { label: "Toyota Camry", value: "Toyota Camry" },
              { label: "Toyota Highlander", value: "Toyota Highlander" },
              { label: "Toyota Proace Verso", value: "Toyota Proace Verso" },
              { label: "Toyota Proace City", value: "Toyota Proace City" },
              { label: "Honda Navi", value: "Honda Navi" },
              { label: "Honda Shadow", value: "Honda Shadow" },
              { label: "Honda Rebel", value: "Honda Rebel" },
              { label: "Suzuki Boulevard", value: "Suzuki Boulevard" },
              { label: "Suzuki Intruder", value: "Suzuki Intruder" },
              { label: "Mercedes-Benz Atego", value: "Mercedez-Benz Atego" },
              { label: "Mercedes-Benz Arocs", value: "Mercedez-Benz Aroc" },
              { label: "Mercedes-Benz Unimog U 216-U530", value: "Mercedez-Benz Unimog U 216-U530" },
              { label: "Mercedes-Benz Sprinter 511", value: "Mercedes-Benz Sprinter 511" },
              { label: "Mercedes-Benz Atego 1523L", value: "Mercedes-Benz Atego 1523L" },
              { label: "Other", value: "Other" },
            ]}
          />
        </View>

        <View
          style={{
            marginBottom: 10,
            marginLeft: 10,
            marginRight: 15,
            borderWidth: 1,
          }}
        >
          {otherVehicle()}
        </View>

        <View
          style={{
            marginBottom: 10,
            marginLeft: 10,
            marginRight: 15,
            backgroundColor: "white",
          }}
        >
          <Input
            placeholder="License"
            leftIcon={{
              type: "font-awesome",
              name: "list",
              size: 20,
              color: "orange",
            }}
            onChangeText={(value) => {
              setLicense(value);
              setErrorLicense(null);
            }}
            errorMessage={errorLicense}
          />
        </View>

        <View
          style={{
            padding: 10,
            marginBottom: 10,
            marginLeft: 10,
            marginRight: 15,
            backgroundColor: "white",
          }}
        >
          <RNPickerSelect
            style={styles.pickerInput}
            placeholder={{ label: "Select Engine Type", value: null }}
            onValueChange={typeEnginee}
            items={[ // all type of enginee available
              { label: "Diesel", value: "Diesel" },
              { label: "Petrol", value: "Petrol" },
              { label: "Electric", value: "Electric" },
              { label: "Hybrid", value: "Hybrid" },
            ]}
          />
        </View>
        <View
          style={{
            padding: 10,
            marginLeft: 10,
            marginRight: 15,
            backgroundColor: "white",
          }}
        >
          <RNPickerSelect
            style={styles.pickerInput}
            placeholder={{ label: "Choose service Type", value: null }}
            onValueChange={typeService}
            items={[
              { label: "Annual Service", value: "Annual Service" },
              { label: "Major Service", value: "Major Service" },
              { label: "Repair", value: "Repair" },
              { label: "Major Repair", value: "Major Repair" },
            ]}
          />
        </View>
        {/* using a button to open the calendar and the user will be able to select a date */}

        {chooseDate()}

        {chooseTime()}
        <MyInput
          style={styles.TextInput}
          placeholder="Comments" // created for any comments on book section
          underlineColorAndroid={"transparent"}
          onChangeText={(text) => {
            formData.comment = text;
          }}
          defaultValue={formData.comment}
        />

        {isLoading && <Text>Loading...</Text>}

        {!isLoading && (
          <MyButton
            title="Book"
            buttonStyle={styles.button}
            onPress={() => saveBooking()} // calling the function to storage the booking
            disabled={date.getDay() === 0}
          />
        )}
      </ScrollView>
    </FormContainer>
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
  logout: userActions.logout
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingScreen);
