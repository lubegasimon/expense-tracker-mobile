import { render, screen } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";

import HomeScreen from "../HomeScreen";

describe("<HomeScreen/>", () => {
  test("HomeScreen contains Button", () => {
    const tree = render(
      <NavigationContainer>
        <HomeScreen />
      </NavigationContainer>,
    ).toJSON();

    expect(tree).toMatchSnapshot();
    expect(
      screen.getByRole("button", { name: "Create your account" }),
    ).toBeTruthy();
  });
});
