import { Text, View, StyleSheet } from "react-native";

export default function Index() {
  return (
    <View style={styles.view}>
      <Text style={styles.appName}>Welcome to Expense tracker</Text>

    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },

  appName: {
    fontSize: 20,
    fontWeight: "bold",
  }
});
