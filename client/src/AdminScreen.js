import * as React from "react";
import { View, Text, Image, TouchableOpacity } from 'react-native';
import MyButton from "../components/MyButton";
import Title from "../components/Title";
import styles from "./styles/MainStyle";
import logo from "../assets/gergarage.png";
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { userActions } from './redux';

function AdminScreen({ navigation, logout }) {

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <TouchableOpacity style={{ padding: 5 }} onPress={() => { logout() }} >
        <Text>Logout</Text>
      </TouchableOpacity>
    })
    return () => {

    }
  }, [navigation])

  const onAllBooking = () => {
    navigation.navigate("AllBookings");
  };
  const onInvoice = () => {
    navigation.navigate("Invoice");
  };
  const onRostering = () => {
    navigation.navigate("Rostering");
  };

  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <Image source={logo} />
        <Title>Ger GARAGE</Title>
      </View>

      <MyButton title="All Booking" onPress={() => onAllBooking()} />
      <MyButton title="Invoce" onPress={() => onInvoice()} />
      <MyButton title="Rostering" onPress={() => onRostering()} />
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
  logout: userActions.logout
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminScreen);