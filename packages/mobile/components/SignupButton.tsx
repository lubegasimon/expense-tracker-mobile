import React from "react";
import { Button, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function SignupButton() {
  const navigation = useNavigation();
  return (
    <View>
      <Button
        title="Create account"
        onPress={() => navigation.navigate("signup")}
      />
    </View>
  );
}
