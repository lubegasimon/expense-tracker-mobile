import { Text, View, StyleSheet } from "react-native";

import UsernameField from "./UsernameField";
import EmailField from "./EmailField";
import PasswordField from "./PasswordField";

function SignupForm() {
  return (
    <View style={styles.view}>
      <Text> Create account </Text>
      <UsernameField />
      <EmailField />
      <PasswordField />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 50,
  },

  appName: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default SignupForm;
