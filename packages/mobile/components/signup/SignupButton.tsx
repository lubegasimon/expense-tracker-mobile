import React from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { RouteNavigationStack } from "@/types";

type UserDashboardNavigationProp = StackNavigationProp<
  RouteNavigationStack,
  "userDashboard"
>;

function SignupButton() {
  const navigation = useNavigation<UserDashboardNavigationProp>();
  return (
    <View>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("userDashboard")}
      >
        <Text style={styles.buttonText}>Signup</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 150,
    borderColor: "white",
    backgroundColor: "#34b4eb",
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
  },
});

export default SignupButton;
