import { render, screen } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";

import SignupForm from "../SignupScreen";

describe("<SignupForm/>", () => {
  test("Signup form contains username text input", () => {
    const tree = render(
      <NavigationContainer>
        <SignupForm />
      </NavigationContainer>,
    );
    expect(tree).toMatchSnapshot();
    screen.getByPlaceholderText("Username");
    screen.getByPlaceholderText("Email");
    screen.getByPlaceholderText("Password");
    screen.getByPlaceholderText("Confirm Password");
  });
});
