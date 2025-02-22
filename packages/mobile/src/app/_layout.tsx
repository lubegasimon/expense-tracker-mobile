import { Stack } from "expo-router";
import { en, registerTranslation } from "react-native-paper-dates";
import { Provider } from "react-redux";
import { store } from "../redux/store";

registerTranslation("en", en);

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack />
    </Provider>
  );
}
