import { Link } from "expo-router";
import SignupForm from "@/src/screens/SignupScreen";

export default function Signup() {
  return (
    <Link href="/verifyCode">
      <SignupForm />
    </Link>
  );
}
