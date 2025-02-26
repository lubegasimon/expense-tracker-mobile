import { View } from "react-native";
import { useState, useEffect } from "react";
import { axiosInstance } from "@/src/api/axios";
import { getExpenses } from "@/src/api/endpoints";
import type { expense } from "../components/Expenses";
import Expenses from "../components/Expenses";
import Loader from "../components/Loader/loader";
import { useAppSelector } from "../redux/hooks";
import { selectExpenseCount } from "../redux/expenseCountSlice";

function ExpensesScreen() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [expenses, setExpenses] = useState<expense[]>([]);

  const expenseAdded = useAppSelector(selectExpenseCount);

  useEffect(() => {
    function fetchExpense() {
      setLoading(true);
      axiosInstance
        .get(`${getExpenses}`)
        .then((response) => {
          setExpenses(response.data.expenses);
        })
        .catch((error) => {
          if (!error.response || !error.response.data) {
            console.error("No response data received from the server:", error);
            setError(
              "Failed to connect to the server. Confirm that you are connected to the internet and try again",
            );
            return;
          }
          setError(error.response.data.error);
        })
        .finally(() => setLoading(false));
    }
    fetchExpense();
  }, [expenseAdded]);

  if (loading) return <Loader />;
  else
    return (
      <View>
        {/* TODO: server query is made whenever expenses is pressed, can we cache the result? */}
        <Expenses expenses={expenses} error={error} />
      </View>
    );
}

export default ExpensesScreen;
