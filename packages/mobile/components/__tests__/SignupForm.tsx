import { render, screen } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";

import SignupForm from "../signup/SignupForm";

describe("<SignupForm/>", () => {
  test("Signup form contains username text input", () => {
    const tree = render(
      <NavigationContainer>
        <SignupForm />
      </NavigationContainer>,
    );
    expect(tree).toMatchSnapshot();
    screen.getByPlaceholderText("Enter Your Username");
    screen.getByPlaceholderText("Enter Your Email");
    screen.getByPlaceholderText("Enter Your Password");
    screen.getByPlaceholderText("Confirm Password");
  });
});
