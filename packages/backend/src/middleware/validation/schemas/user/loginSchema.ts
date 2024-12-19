import { JSONSchemaType } from "ajv";

interface LoginBody {
  email: string;
  password: string;
}

const loginBodySchema: JSONSchemaType<LoginBody> = {
  type: "object",
  properties: {
    email: { type: "string", format: "email" },
    password: { type: "string", minLength: 5, maxLength: 256 },
  },
  required: ["email", "password"],
  additionalProperties: false,
  errorMessage: {
    properties: {
      email: "Invalid email format",
      password: "Password must NOT have fewer than 5 characters",
    },
  },
};

export default loginBodySchema;
