import { render, screen } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { store } from "@/src/redux/store";
import Expenses from "../Expenses";

/* Hack: Supress React Native animation helpers that scedule timers that conflict with jest */
jest.useFakeTimers();

const mockExpenses = [
  {
    id: "01",
    name: "Water",
    amount: 20,
    details: "Water bills for Feb",
    category: "Utilities",
    categoryId: "",
    createdAt: "12/28/2025",
  },
  {
    id: "02",
    name: "Groceries",
    amount: 50,
    details: "Weekly groceries",
    category: "Food",
    categoryId: "",
    createdAt: "12/28/2025",
  },
];

describe("<Expenses Component/>", () => {
  const mockProps = {
    expenses: mockExpenses,
    error: "",
  };

  it("renders the header correctly", () => {
    const tree = render(
      <Provider store={store}>
        <NavigationContainer>
          <Expenses {...mockProps} />
        </NavigationContainer>
      </Provider>,
    ).toJSON();

    expect(tree).toMatchSnapshot();
    expect(screen.getByText("Name")).toBeTruthy();
    expect(screen.getByText("Amount")).toBeTruthy();
  });

  it("should render a list of expenses", () => {
    const tree = render(
      <Provider store={store}>
        <NavigationContainer>
          <Expenses {...mockProps} />
        </NavigationContainer>
      </Provider>,
    ).toJSON();

    expect(tree).toMatchSnapshot();
    expect(screen.getByText("Water")).toBeTruthy();
    expect(screen.getByText("20")).toBeTruthy();
    expect(screen.getByText("Groceries")).toBeTruthy();
    expect(screen.getByText("50")).toBeTruthy();
  });

  it("should render the empty state when there are no expenses", () => {
    const tree = render(
      <Provider store={store}>
        <NavigationContainer>
          <Expenses expenses={[]} error="" />
        </NavigationContainer>
      </Provider>,
    ).toJSON();

    expect(tree).toMatchSnapshot();
    expect(screen.getByText("No expenses yet today")).toBeTruthy();
  });

  it("should render an error message when there is an error", () => {
    const tree = render(
      <Provider store={store}>
        <NavigationContainer>
          <Expenses expenses={mockExpenses} error="Something went wrong" />
        </NavigationContainer>
      </Provider>,
    ).toJSON();

    expect(tree).toMatchSnapshot();
    expect(screen.getByText("Something went wrong")).toBeTruthy();
  });
});
