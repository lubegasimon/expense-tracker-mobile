import { render, screen } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";

import SignupForm from "../SignupScreen";
import { Provider } from "react-redux";
import { store } from "@/src/redux/store";

describe("<SignupForm/>", () => {
  test("Signup form contains username text input", () => {
    const tree = render(
      <Provider store={store}>
        <NavigationContainer>
          <SignupForm />
        </NavigationContainer>
      </Provider>,
    ).toJSON();

    expect(tree).toMatchSnapshot();
    expect(screen.getByPlaceholderText("Username")).toBeTruthy();
    expect(screen.getByPlaceholderText("Email")).toBeTruthy();
    expect(screen.getByPlaceholderText("Password")).toBeTruthy();
    expect(screen.getByPlaceholderText("Confirm Password")).toBeTruthy();
  });
});
