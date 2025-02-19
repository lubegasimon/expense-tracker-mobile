import { JSONSchemaType } from "ajv";

interface ExpenseBody {
  name: string;
  amount: number;
  details: string;
  category: string;
  createdAt: string;
}
const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

const expenseBodySchema: JSONSchemaType<ExpenseBody> = {
  type: "object",
  properties: {
    name: { type: "string" },
    amount: { type: "number" },
    category: { type: "string" },
    details: { type: "string", maxLength: 256 },
    createdAt: { type: "string", pattern: dateRegex.source },
  },
  required: ["name", "amount", "createdAt"],
  additionalProperties: false,
  errorMessage: {
    properties: {
      createdAt: "Invalid date format. Expected for example MM/DD/YYYY",
      Details: "Details must NOT have more than 256 characters",
    },
  },
};

export default expenseBodySchema;
