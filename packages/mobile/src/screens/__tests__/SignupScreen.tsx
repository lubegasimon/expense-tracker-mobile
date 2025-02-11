import { render, screen } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { store } from "@/src/redux/store";
import SignupFormScreen from "../SignupScreen";

/* Hack: Supress React Native animation helpers that scedule timers that conflict with jest */
jest.useFakeTimers();

describe("<SignupForm/>", () => {
  test("should contain signup form text inputs", () => {
    const tree = render(
      <Provider store={store}>
        <NavigationContainer>
          <SignupFormScreen />
        </NavigationContainer>
      </Provider>,
    ).toJSON();

    expect(tree).toMatchSnapshot();
    expect(screen.getAllByText("Username")).toBeTruthy();
    expect(screen.getAllByText("Email")).toBeTruthy();
    expect(screen.getAllByText("Password")).toBeTruthy();
    expect(screen.getAllByText("Confirm password")).toBeTruthy();
  });
});
