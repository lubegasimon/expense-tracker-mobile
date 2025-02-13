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
    name: { type: "string" },
    amount: { type: "number" },
    category: { type: "string" },
    details: { type: "string", maxLength: 256 },
    createdAt: { type: "string", format: "date" },
  },
  required: ["name", "amount"],
  additionalProperties: false,
  errorMessage: {
    properties: {
      Details: "Details must NOT have more than 256 characters",
    },
  },
};

export default expenseBodySchema;
