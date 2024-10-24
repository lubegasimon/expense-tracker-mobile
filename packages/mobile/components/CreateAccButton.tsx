import React from "react";
import { Button, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function CreateAccount() {
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
