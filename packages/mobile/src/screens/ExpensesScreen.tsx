import { View } from "react-native";
import { useState, useEffect } from "react";
import { axiosInstance } from "@/src/api/axios";
import { getExpensesByDate } from "@/src/api/endpoints";
import type { expense } from "../components/Expenses";
import Expenses from "../components/Expenses";
import Loader from "../components/Loader/loader";
import { useAppSelector } from "../redux/hooks";
import { selectExpenseCount } from "../redux/expenseCountSlice";
import Error from "../components/Error/Error";
import AddExpense from "../components/Expense/AddExpenseButton";
import FilterExpensesByDate, { splitDate } from "../components/FilterExpenses";
import { catchError } from "../util";

function ExpensesScreen() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [expenses, setExpenses] = useState<expense[]>([]);
  const [date, setDate] = useState<Date | undefined>(undefined);

  const expenseAdded = useAppSelector(selectExpenseCount);

  const queryDate = date
    ? splitDate(new Date(date.getFullYear(), date.getMonth(), date.getDate()))
    : splitDate(new Date());

  useEffect(() => {
    function fetchExpense() {
      setLoading(true);
      /**
       * Fetches expenses for the current date, otherwise fetches expenses
       * for the specified date.
       */
      axiosInstance
        .get(`${getExpensesByDate}?date=${queryDate}`)
        .then((response) => {
          setExpenses(response.data.expenses);
          setError("");
        })
        .catch((error) => catchError(error, setError))
        .finally(() => setLoading(false));
    }
    fetchExpense();
  }, [expenseAdded]);

  if (loading) return <Loader />;
  else
    return (
      <View style={{ padding: 20 }}>
        <View style={{ height: error ? "30%" : "10%" }}>
          <FilterExpensesByDate
            date={date}
            setDate={setDate}
            expenses={expenses}
            setExpenses={setExpenses}
            setLoading={setLoading}
            setError={setError}
          />
        </View>
        {error ? (
          <View>
            <Error error={error} />
            <AddExpense />
          </View>
        ) : (
          <Expenses expenses={expenses} error={error} />
        )}
      </View>
    );
}

export default ExpensesScreen;
