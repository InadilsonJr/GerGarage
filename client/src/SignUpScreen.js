import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import styles from "./styles/MainStyle";
import FormContainer from "../components/FormContainer";
import MyButton from "../components/MyButton";
import MyInput from "../components/MyInput";
import axios from "axios";
import userService from "./services/userService";

import Constants from "expo-constants";
const { manifest } = Constants;

const url =
  "http://" + manifest.debuggerHost.split(`:`).shift().concat(`:3000`);

export default function SignUpScreen({ navigation }) {
  // creating the const where the information will be stored

  const [email, setEmail] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [surname, setSurname] = useState(null);

  const [mobile, setMobile] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [isSelected, setSelected] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [visibleDialog, setVisibleDialog] = useState(false);
  const [titulo, setTitulo] = useState(null);
  const [tipo, setTipo] = useState(null);
  const [message, setMessage] = useState(null);
  const [formErrorData, setFormErrorData] = useState({
    errorFirstName: null,
    errorSurname: null,
    errorEmail: null,
    errorMobile: null,
    errorPassword: null,
    errorConfirmPassword: null,
  });

  const showDialog = (titulo, message, tipo) => {
    setVisibleDialog(true);
    setTitulo(titulo);
    setMessage(message);
    setTipo(tipo);
  };

  const hideDialog = (status) => {
    setVisibleDialog(status);
  };
  // checking that the user enterd a valid value
  const validateForm = () => {
    let error = false;
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(email).toLowerCase())) {
      setFormErrorData({
        errorEmail: "Please enter your email"
      })
      error = true;
    }
    if (!email) {
      formErrorData.errorEmail = "Please enter your email"
      setFormErrorData({
        ...formErrorData
      })
      error = true;
    }
    if (!firstName) {
      formErrorData.errorFirstName = "Please enter your name";
      setFormErrorData({
        ...formErrorData
      })
      error = true;
    }
    if (!surname) {
      formErrorData.errorSurname = "Please enter your Surname";
      setFormErrorData({
        ...formErrorData
      })
      error = true;
    }

    if (!password) {
      formErrorData.errorPassword = "Please enter a password"
      setFormErrorData({
        ...formErrorData
      })
      error = true;
    }
    if (password !== confirmPassword) {
      formErrorData.errorConfirmPassword = "Please enter a confirm password same as password"
      setFormErrorData({
        ...formErrorData
      })
      error = true;
    }
    if (!confirmPassword) {
      formErrorData.errorConfirmPassword = "Please enter a confirm"
      setFormErrorData({
        ...formErrorData
      })
      error = true;
    }
    if (!mobile) {
      formErrorData.errorMobile = "Please enter your phone number";
      setFormErrorData({
        ...formErrorData
      })
      error = true;
    }
    return !error;
  };
  // this function get the data and send to the userSevice to register the user.
  const register = async () => {
    // TODO fazer validacao do pass e confirm pass
    const isError = validateForm();
    if (isError) {
      return;
    }
     userService
      .signup({role: "Customer" })
      .then((response) => {
        setLoading(false);
        const titulo = response.data.status ? "User Registered" : "Error";
        showDialog(titulo, response.data.message, "SUCESSO");
      })
      .catch((error) => {
        setLoading(false);
        showDialog("Error", "Please try again", "ERROR");
        console.log(error);
      });
  };

    return (
    //   possibilite to standards all containers
    // created all necessaries dados to registration
    <FormContainer>
      <Text style={styles.header}> Registration</Text>

      <MyInput
        errorMessage={formErrorData.errorFirstName}
        placeholder="First name"
        underlineColorAndroid="transparent"
        onChangeText={setFirstName}
        defaultValue={firstName}
      />

      <MyInput
        errorMessage={formErrorData.errorSurname}
        style={styles.TextInput}
        placeholder="Surname"
        underlineColorAndroid="transparent"
        onChangeText={setSurname}
        defaultValue={surname}
      />

      <MyInput
        errorMessage={formErrorData.errorMobile}
        style={styles.TextInput}
        placeholder="Mobile"
        underlineColorAndroid="transparent"
        onChangeText={setMobile}
        defaultValue={mobile}
      />

      <MyInput
        errorMessage={formErrorData.errorEmail}
        style={styles.TextInput}
        placeholder="Email"
        underlineColorAndroid="transparent"
        onChangeText={setEmail}
        defaultValue={email}
      />

      <MyInput
        errorMessage={formErrorData.errorPassword}
        secureTextEntry={true}
        style={styles.TextInput}
        placeholder="Password"
        underlineColorAndroid="transparent"
        onChangeText={setPassword}
        defaultValue={password}
      />

      <MyInput
        errorMessage={formErrorData.errorConfirmPassword}
        secureTextEntry={true}
        style={styles.TextInput}
        placeholder="Confirm Password"
        underlineColorAndroid="transparent"
        onChangeText={setConfirmPassword}
        defaultValue={confirmPassword}
      />

      <TouchableOpacity style={styles.buttom}>
        <MyButton title={"Register"} onPress={() => register()} />
      </TouchableOpacity>
    </FormContainer>
  );
}