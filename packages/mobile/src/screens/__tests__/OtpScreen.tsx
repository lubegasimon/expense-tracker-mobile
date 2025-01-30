import { render, screen } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";

import OtpScreen from "../OtpScreen";
import { Provider } from "react-redux";
import { store } from "@/src/redux/store";

jest.mock("@react-navigation/native", () => ({
  ...jest.requireActual("@react-navigation/native"),
  useRoute: () => ({
    params: { email: "johndoe@gmail.com" },
  }),
}));

describe("<OptScreen/>", () => {
  test("OtpScreen contains resend code and submit button", () => {
    const tree = render(
      <Provider store={store}>
        <NavigationContainer>
          <OtpScreen />
        </NavigationContainer>
      </Provider>,
    ).toJSON();

    expect(tree).toMatchSnapshot();
    expect(screen.getByText("Resend code")).toBeTruthy();
    expect(screen.getByText("Submit")).toBeTruthy();
  });
});
