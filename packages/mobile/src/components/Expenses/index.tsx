import { Text, View, FlatList, StyleSheet, SafeAreaView } from "react-native";
import AddExpense from "../Expense/AddExpenseButton";
import Error from "../Error/Error";

interface ExpensesProps {
  expenses: expense[];
  error: string;
}

export type expense = {
  id: string;
  name: string;
  amount: number;
  details: string;
  category: string;
  categoryId: string;
  createdAt: string;
};

function EmptyList() {
  return (
    <View>
      <View
        style={{
          alignItems: "center",
          padding: 50,
        }}
      >
        <Text style={{ fontSize: 30 }}>No expenses yet today</Text>
      </View>
    </View>
  );
}

function Expenses({ expenses, error }: ExpensesProps) {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.header}>Name</Text>
          <Text style={styles.header}>Amount</Text>
        </View>
        {error ? (
          <Error error={error} />
        ) : (
          <FlatList
            data={expenses}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              const { name, amount } = item;
              return (
                <View style={styles.row}>
                  <Text style={styles.cell}>{name}</Text>
                  <Text style={styles.cell}>{amount}</Text>
                </View>
              );
            }}
            ListEmptyComponent={EmptyList}
          />
        )}
      </View>
      <View style={{ paddingLeft: 10 }}>
        <AddExpense />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { paddingLeft: 10, height: "90%" },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  header: { fontWeight: "bold", fontSize: 16, flex: 1 },
  cell: { fontSize: 14, flex: 1 },
});

export default Expenses;
