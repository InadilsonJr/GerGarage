import React from "react";
import { KeyboardAvoidingView, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import styles from "../src/styles/MainStyle";

export default FormContainer = (props) => (
  <KeyboardAvoidingView
    behavior={Platform.OS == "ios" ? "padding" : "height"}
    keyboardVerticalOffset={80}
  > 
    {/* <ScrollView keyboardShouldPersistTaps="always"> */}
    <View style={{...styles.boxContainer, ...props.style}}>
      {props.children}
    </View>
    {/* </ScrollView> */}
    
  </KeyboardAvoidingView>
);
