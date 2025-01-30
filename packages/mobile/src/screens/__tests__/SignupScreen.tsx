import { render, screen } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";

import SignupForm from "../SignupScreen";

describe("<SignupForm/>", () => {
  test("Signup form contains username text input", () => {
    const tree = render(
      <NavigationContainer>
        <SignupForm />
      </NavigationContainer>,
    ).toJSON();

    expect(tree).toMatchSnapshot();
    expect(screen.getByPlaceholderText("Username")).toBeTruthy();
    expect(screen.getByPlaceholderText("Email")).toBeTruthy();
    expect(screen.getByPlaceholderText("Password")).toBeTruthy();
    expect(screen.getByPlaceholderText("Confirm Password")).toBeTruthy();
  });
});
