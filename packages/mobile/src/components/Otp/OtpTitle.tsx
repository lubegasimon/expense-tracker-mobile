import { Text } from "react-native";
import styles from "./styles";

function OtpTitle({ subTitle }: { subTitle: string }) {
  return (
    <>
      <Text style={styles.title}> Enter verification code </Text>
      <Text style={styles.subTitle}> {subTitle} </Text>
    </>
  );
}

export default OtpTitle;
