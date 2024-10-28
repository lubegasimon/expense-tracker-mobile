import { Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";

import CreateAccountButton from "@/components/CreateAccButton";
import { Home } from "@/api/index";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.appName}>Welcome to Expense tracker</Text>
      <Link href="/signup">
        <CreateAccountButton />
      </Link>
      <Home />
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
