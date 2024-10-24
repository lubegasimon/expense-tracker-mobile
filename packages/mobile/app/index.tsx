import { Text, View, StyleSheet} from "react-native";
import { Link } from "expo-router";

import SignupButton from "@/components/SignupButton";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.appName}>Welcome to Expense tracker</Text>
      <Link href="/signup">
        <SignupButton />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  appName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
