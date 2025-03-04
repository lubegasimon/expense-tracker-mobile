import { useState, useCallback } from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";
import { DatePickerModal } from "react-native-paper-dates";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { axiosInstance } from "@/src/api/axios";
import { getExpensesByDate } from "@/src/api/endpoints";
import { expense } from "../Expenses";
import { catchError } from "@/src/util";

interface FilterExpensesProps {
  date: Date | undefined;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
  expenses: expense[];
  setExpenses: React.Dispatch<React.SetStateAction<expense[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const splitDate = (date: Date) => date.toISOString().split("T")[0];

function FilterExpensesByDate({
  date,
  setDate,
  expenses,
  setExpenses,
  setLoading,
  setError,
}: FilterExpensesProps) {
  const [open, setOpen] = useState(false);

  const onDismissSingle = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  //TODO: This Filters for a single date, not the date range
  function onFilterByDate(date: Date | undefined) {
    if (!date) {
      /** Renders the current component if date is undefined this avoids unnecessary API call */
      setExpenses(expenses);
    } else {
      const queryDate = splitDate(
        new Date(date.getFullYear(), date.getMonth(), date.getDate()),
      );

      setLoading(true);
      axiosInstance
        .get(`${getExpensesByDate}?date=${queryDate}`)
        .then((response) => {
          setExpenses(response.data.expenses);
          setError("");
        })
        .catch((error) => catchError(error, setError))
        .finally(() => setLoading(false));
    }
  }

  const onConfirmSingle = useCallback(
    (params: { [key: string]: Date | undefined }) => {
      setOpen(false);
      setDate(params.date);
      onFilterByDate(params.date);
    },
    [setOpen, setDate],
  );

  return (
    <SafeAreaProvider>
      <View
        style={{
          padding: 10,
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <Button onPress={() => setOpen(true)} uppercase={false} mode="outlined">
          {date
            ? `Expenses for ${date.toLocaleDateString()}`
            : "Today's expenses"}
        </Button>
        <DatePickerModal
          disableStatusBarPadding
          locale="en"
          presentationStyle="pageSheet"
          mode="single"
          startWeekOnMonday={true}
          visible={open}
          onDismiss={onDismissSingle}
          date={date}
          onConfirm={onConfirmSingle}
          onChange={() => setDate}
          saveLabel="Apply"
        />
      </View>
    </SafeAreaProvider>
  );
}

export default FilterExpensesByDate;
