import { Text } from "react-native";
import styles from "./styles";

function OtpHeadings() {
  return (
    <>
      <Text style={styles.heading}> Enter verification code </Text>
      <Text style={styles.subHeading}> Code has been send to your email </Text>
    </>
  );
}

export default OtpHeadings;
