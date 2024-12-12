import { View, Text, Pressable } from "react-native";
import styles from "./styles";

function SubmitCode() {
  return (
    <View style={styles.buttonContainer}>
      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>{"Submit"}</Text>
      </Pressable>
    </View>
  );
}

export default SubmitCode;
