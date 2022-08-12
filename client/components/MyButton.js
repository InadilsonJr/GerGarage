
import React from "react";
import {TouchableOpacity, Text } from "react-native";
import styles from '../src/styles/MainStyle';


export default MyButton = ({ onPress, title }) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={styles.appButtonContainer}
    >
      <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
);
