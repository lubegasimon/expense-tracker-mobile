import { render, screen } from "@testing-library/react-native";
import ExpenseForm from "../Expense/ExpenseForm";

/* Hack: Supress React Native animation helpers that scedule timers that conflict with jest */
jest.useFakeTimers();

describe("<ExpenseForm/>", () => {
  const mockProps = {
    name: "Internet",
    amount: "10",
    details: "Internet subscription for February",
    category: "Internet and Communication",
    createdAt: undefined,
    onChangeName: jest.fn(),
    onChangeAmount: jest.fn(),
    onChangeDetails: jest.fn(),
    onChangeCategory: jest.fn(),
    onChangeCreatedAt: jest.fn(),
    errors: {},
  };

  it("should render all text inputs correctly", () => {
    const tree = render(<ExpenseForm {...mockProps} />).toJSON();

    expect(tree).toMatchSnapshot();
    expect(screen.getAllByText("Name")).toBeTruthy();
    expect(screen.getAllByText("Amount")).toBeTruthy();
    expect(screen.getAllByText("Details")).toBeTruthy();
    expect(screen.getAllByText("Category")).toBeTruthy();
  });
});
