import React from "react";
import { View } from "react-native";
import { DatePickerInput } from "react-native-paper-dates";
import { SafeAreaProvider } from "react-native-safe-area-context";
import inputStyles from "../Input/styles";

interface DatePickerProps {
  error: string;
  date: Date | undefined;
  onChangeDate: (date: Date | undefined) => void;
}

const DatePicker = ({ date, onChangeDate, error }: DatePickerProps) => {
  return (
    <SafeAreaProvider>
      <View style={{ justifyContent: "center", flex: 1, alignItems: "center" }}>
        <DatePickerInput
          locale="en"
          label="Date"
          value={date}
          onChange={onChangeDate}
          inputMode="start"
          hasError={error ? true : false}
          presentationStyle="pageSheet"
          returnKeyType="done"
          startWeekOnMonday={true}
          style={inputStyles.input}
        />
      </View>
    </SafeAreaProvider>
  );
};

export default DatePicker;
