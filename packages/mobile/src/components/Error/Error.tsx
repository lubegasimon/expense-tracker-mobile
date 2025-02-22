import { Text, StyleSheet, StyleProp, TextStyle } from "react-native";
import React from "react";
interface ErrorProps {
  error: string | undefined;
  style?: StyleProp<TextStyle>;
}

function Error({ error, style }: ErrorProps) {
  return <>{error && <Text style={[errorStyle.error, style]}>{error}</Text>}</>;
}

const errorStyle = StyleSheet.create({
  error: {
    textAlign: "left",
    width: 300,
    margin: 5,
    color: "red",
    marginTop: -5,
  },
});

export default Error;
