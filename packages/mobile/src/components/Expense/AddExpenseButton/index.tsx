import { useState } from "react";
import { Pressable, Text, Modal, View, ScrollView } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { axiosInstance } from "@/src/api/axios";
import { createExpense } from "@/src/api/endpoints";
import Loader from "../../Loader/loader";
import { useAppDispatch } from "@/src/redux/hooks";
import { incrementExpenseCount } from "@/src/redux/expenseCountSlice";
import ExpenseForm from "../ExpenseForm";
import { modalStyles, saveAndCancel, addExpenseButton } from "./styles";

function AddExpense() {
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [details, setDetails] = useState("");
  const [category, setCategory] = useState("");
  const [createdAt, setCreatedAt] = useState<Date | undefined>(undefined);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const dispatch = useAppDispatch();

  function resetForm() {
    setErrors({});
    setName("");
    setAmount("");
    setDetails("");
    setCategory("");
    setCreatedAt(undefined);
  }

  function handleCancel() {
    setModalVisible(false);
    resetForm();
  }

  function handleSave() {
    setLoading(true);
    const validationErrors: { [key: string]: string } = {};
    if (!name.trim()) validationErrors.nameRequired = "Name is required";
    if (!amount || isNaN(parseFloat(amount)))
      validationErrors.amountRequired =
        "Invalid amount. Amount should be a number";
    if (!createdAt) validationErrors.dateRequired = "Date is required";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
    } else
      axiosInstance
        .post(
          createExpense,
          JSON.stringify({
            name,
            amount: parseFloat(amount),
            details,
            category,
            createdAt,
          }),
        )
        .then(() => {
          Toast.show({
            type: "success",
            text1: "Expense successfully created",
          });
          dispatch(incrementExpenseCount());
          setErrors({});
          resetForm();
          setModalVisible(false);
        })
        .catch((error) => {
          if (!error.response || !error.response.data) {
            console.error("No response data received from the server:", error);
            setErrors({
              NetworkError:
                "Failed to connect to the server. Confirm that you are connected to the internet and try again",
            });
          }
          setErrors(error.response.data.error);
        })
        .finally(() => setLoading(false));
  }

  if (loading) return <Loader />;
  else
    return (
      <SafeAreaProvider>
        <SafeAreaView>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(!modalVisible)}
          >
            <View style={modalStyles.modalBackground}>
              <View style={modalStyles.modalContainer}>
                <ScrollView
                  contentContainerStyle={{
                    flexGrow: 1,
                    justifyContent: "center",
                  }}
                >
                  <ExpenseForm
                    name={name}
                    amount={amount}
                    details={details}
                    category={category}
                    createdAt={createdAt}
                    onChangeName={setName}
                    onChangeAmount={setAmount}
                    onChangeCategory={setCategory}
                    onChangeDetails={setDetails}
                    onChangeCreatedAt={setCreatedAt}
                    errors={errors}
                  />
                </ScrollView>
                <View style={modalStyles.buttonRow}>
                  <Pressable
                    style={saveAndCancel.button}
                    onPress={handleCancel}
                  >
                    <Text style={saveAndCancel.buttonText}> cancel </Text>
                  </Pressable>
                  <Pressable style={saveAndCancel.button} onPress={handleSave}>
                    <Text style={saveAndCancel.buttonText}> save </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
          <Pressable
            style={addExpenseButton.button}
            onPress={() => {
              setModalVisible(true);
            }}
          >
            <Text style={addExpenseButton.buttonText}>Add Expense</Text>
          </Pressable>
        </SafeAreaView>
      </SafeAreaProvider>
    );
}

export default AddExpense;
