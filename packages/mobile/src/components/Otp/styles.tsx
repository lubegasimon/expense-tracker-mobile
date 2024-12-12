import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    paddingLeft: "10%",
    paddingRight: "10%",
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    paddingTop: "10%",
    paddingBottom: "3%",
  },
  subHeading: {
    fontSize: 15,
    paddingLeft: "10%",
    paddingBottom: "10%",
  },
  error: {
    color: "red",
  },
  buttonContainer: {
    paddingLeft: "10%",
    paddingRight: "10%",
    paddingTop: "5%",
  },
  button: {
    width: "100%",
    borderColor: "white",
    backgroundColor: "#34b4eb",
    padding: 10,
    borderRadius: 10,
    paddingRight: "10%",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 25,
  },
});

export default styles;
