import { Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";
import HomeScreen from "@/src/screens/HomeScreen";
import OtpScreen from "../screens/OtpScreen";
import SignupForm from "../screens/SignupScreen";

// export default function Home() {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.appName}>Welcome to Expense tracker</Text>
//       <Link href="/signup">
//         <HomeScreen />
//       </Link>
//     </View>
//   );
// }

export default function Home() {
  return (
    <View>
      <OtpScreen />
    </View>
  );
}

// export default function Home() {
//   return (
//     <View style={styles.container}>
//       <SignupForm />
//     </View>
//   );
// }

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
