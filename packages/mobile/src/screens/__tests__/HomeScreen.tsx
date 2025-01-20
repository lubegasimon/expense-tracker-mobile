import { render, screen } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";

import HomeScreen from "../HomeScreen";

describe("<HomeScreen/>", () => {
  test("HomeScreen contains Button", () => {
    const tree = render(
      <NavigationContainer>
        <HomeScreen />
      </NavigationContainer>,
    );
    expect(tree).toMatchSnapshot();
    screen.getByRole("button", { name: "Create your account" });
  });
});
