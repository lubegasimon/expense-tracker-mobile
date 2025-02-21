import { Stack } from "expo-router";
import { en, registerTranslation } from "react-native-paper-dates";
import React from "react";
import Toast from "react-native-toast-message";
import { Provider } from "react-redux";
import { store } from "../redux/store";

registerTranslation("en", en);

export default function RootLayout() {
  return (
    <Provider store={store}>
      <>
        <Stack />
        <Toast />
      </>
    </Provider>
  );
}
