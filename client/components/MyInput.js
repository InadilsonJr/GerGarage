import React from "react";
import { TextInput, View, Text } from "react-native";
import styles from '../src/styles/MainStyle';

const BaseInput = ({ children, error }) => (
  <View style={styles.baseInput}>
    {children}
    <Text>{error}</Text>
  </View>
);


export default MyInput = ({ errorMessage, focus, ...rest }) => {

  return (
    <BaseInput error={errorMessage}>
      <View
        style={[
          styles.inputContainer,
          rest.style,
        ]}
      >
        <TextInput
          {...rest}
          style={styles.textInput}
        />
      </View>
    </BaseInput>
  );
};
