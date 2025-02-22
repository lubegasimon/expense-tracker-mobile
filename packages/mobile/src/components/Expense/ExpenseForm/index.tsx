import { View, StyleSheet } from "react-native";
import Input from "../../Input/Input";
import DatePicker from "../../DatePicker";

interface ExpenseFieldProps {
  name: string;
  amount: string;
  details: string;
  category: string;
  createdAt: Date | undefined;
  onChangeName: (value: string) => void;
  onChangeAmount: (value: string) => void;
  onChangeDetails: (value: string) => void;
  onChangeCategory: (value: string) => void;
  onChangeCreatedAt: (date: Date | undefined) => void;
  errors: { [key: string]: string };
}

function ExpenseForm({
  name,
  amount,
  details,
  category,
  createdAt,
  onChangeName,
  onChangeAmount,
  onChangeDetails,
  onChangeCategory,
  onChangeCreatedAt,
  errors,
}: ExpenseFieldProps) {
  return (
    <View style={styles.container}>
      <Input
        label="Name"
        value={name}
        onChangeText={onChangeName}
        placeholder={name}
        error={errors.name || errors.nameRequired}
      />
      <Input
        label="Amount"
        value={amount}
        onChangeText={(value) => onChangeAmount(value)}
        placeholder={amount}
        error={errors.amount || errors.amountRequired}
      />
      <Input
        label="Details"
        value={details}
        onChangeText={(value) => onChangeDetails(value)}
        placeholder={details}
        error={errors.details}
      />
      <Input
        label="Category"
        value={category}
        onChangeText={(value) => onChangeCategory(value)}
        placeholder={category}
        error={errors.category}
      />
      <DatePicker
        date={createdAt}
        onChangeDate={onChangeCreatedAt}
        error={errors.date || errors.dateRequired}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});

export default ExpenseForm;
