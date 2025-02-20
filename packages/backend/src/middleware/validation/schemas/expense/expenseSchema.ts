import { JSONSchemaType } from "ajv";

interface ExpenseBody {
  name: string;
  amount: number;
  details: string;
  category: string;
  createdAt: string;
}

const expenseBodySchema: JSONSchemaType<ExpenseBody> = {
  type: "object",
  properties: {
    name: { type: "string", minLength: 2 },
    amount: { type: "number" },
    category: { type: "string" },
    details: { type: "string", maxLength: 256 },
    createdAt: { type: "string", format: "date-time" },
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
