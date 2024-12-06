import { StyleSheet } from "react-native";

export const inputStyle = StyleSheet.create({
  input: {
    height: 50,
    width: 300,
    margin: 5,
    fontSize: 20,
    borderColor: "gray",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
});

export const errorStyle = StyleSheet.create({
  error: {
    textAlign: "left",
    width: 300,
    margin: 5,
    color: "red",
    marginTop: -5,
  },
});

export const inputAndErrorStyle = StyleSheet.create({
  view: { marginBottom: 10 },
});

export const signupButtonStyles = StyleSheet.create({
  button: {
    width: 300,
    borderColor: "white",
    backgroundColor: "#34b4eb",
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
  },
});
