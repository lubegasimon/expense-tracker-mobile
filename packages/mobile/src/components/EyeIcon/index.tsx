import { StyleSheet, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";

export interface ShowPasswordProps {
  isShowPassword: boolean;
  setShowPassword: () => void;
}

function EyeIcon({ isShowPassword, setShowPassword }: ShowPasswordProps) {
  return (
    <>
      <Pressable style={style.icon} onPress={setShowPassword}>
        <Ionicons
          name={isShowPassword ? "eye" : "eye-off"}
          size={25}
          color="black"
        />
      </Pressable>
    </>
  );
}

const style = StyleSheet.create({
  icon: {
    position: "absolute",
    right: 10,
    padding: 4,
  },
});

export default EyeIcon;
