import * as React from "react";
import { View, Text, Image } from "react-native";
import MyButton from "../components/MyButton";
import Title from "../components/Title";
import styles from "./styles/MainStyle";
import logo from "../assets/gergarage.png";

export default function MenuScreen({ navigation }) {
  const onBooking = () => {
    navigation.navigate("Booking");
  };
  const onSeeBooking = () => {
    navigation.navigate("SeeBooking");
  };
  const onPayment = () => {
    navigation.navigate("Payment");
  };
  const onLogout = () => {
    navigation.navigate("Home");
  };
  const onSignUp = () => {
    navigation.navigate("SignUp");
  };

  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <Image source={logo} />
        <Title>Ger GARAGE</Title>
      </View>

      <MyButton title="Booking" onPress={() => onBooking()} />
      <MyButton title="See Booking" onPress={() => onSeeBooking()} />
      <MyButton title="Payment" onPress={() => onPayments()} />
      <MyButton title="Log out" onPress={() => onLogout()} />
    </View>
  );
}
