import { Button, Text } from "react-native-paper";
import { StyleSheet } from "react-native";

interface ButtonProp {
  onPress: () => void;
  disabled: boolean;
}

const SignupButton = ({ onPress, disabled }: ButtonProp) => (
  <Button
    mode="contained"
    style={styles.button}
    onPress={onPress}
    disabled={disabled}
  >
    <Text style={styles.buttonText}>Signup</Text>
  </Button>
);

const styles = StyleSheet.create({
  button: {
    width: 300,
    borderColor: "white",
    backgroundColor: "#34b4eb",
    padding: 10,
    borderRadius: 30,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
  },
});

export default SignupButton;
