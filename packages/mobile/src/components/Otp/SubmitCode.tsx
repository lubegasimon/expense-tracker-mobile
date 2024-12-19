import { View, Text, Pressable } from "react-native";
import styles from "./styles";
import { ButtonProps } from "./types";

function SubmitCode({ onPress, disabled }: ButtonProps) {
  return (
    <View style={styles.buttonContainer}>
      <Pressable onPress={onPress} disabled={disabled} style={styles.button}>
        <Text style={styles.buttonText}>{"Submit"}</Text>
      </Pressable>
    </View>
  );
}

export default SubmitCode;
