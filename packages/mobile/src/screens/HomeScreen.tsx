import React from "react";
import { Button, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteNavigationStack } from "@/src/types";

type SignupNavigationProp = StackNavigationProp<RouteNavigationStack, "signup">;

export default function HomeScreen() {
  const navigation = useNavigation<SignupNavigationProp>();
  return (
    <View>
      <Button
        title="Create your account"
        onPress={() => navigation.navigate("signup")}
      />
    </View>
  );
}
