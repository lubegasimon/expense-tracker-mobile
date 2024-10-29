import { render, screen } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";

import SignupForm from "../signup/SignupForm";

describe("<SignupForm/>", () => {
  test("Signup form contains username text input", () => {
    render(
      <NavigationContainer>
        <SignupForm />
      </NavigationContainer>,
    );

    screen.getByPlaceholderText("Enter Your Username");
  });
});
