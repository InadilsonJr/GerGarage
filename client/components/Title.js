import React from "react";
import { Text, View } from "react-native";
import styles from "../src/styles/MainStyle";

export default Title = (props) => (
    <Text style={{ ...styles.title, ...props.style }}>{props.children}</Text>
);
