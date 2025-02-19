import { JSONSchemaType } from "ajv";

interface SignupBody {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const usernameRegex = /^[0-9a-zA-Z_]{5,10}$/;

const signupBodySchema: JSONSchemaType<SignupBody> = {
  type: "object",
  properties: {
    username: { type: "string", pattern: usernameRegex.source },
    email: { type: "string", format: "email" },
    password: { type: "string", minLength: 5, maxLength: 256 },
    confirmPassword: {
      type: "string",
      const: { $data: "1/password" } as unknown as string,
    },
  },
  required: ["username", "email", "password", "confirmPassword"],
  additionalProperties: false,
  errorMessage: {
    properties: {
      username:
        "Username must be 5-10 characters long and can only contain letters, numbers, and underscores",
      email: "Invalid email format",
      password: "Password must NOT have fewer than 5 characters",
      confirmPassword: "Passwords do not match",
    },
  },
};

export default signupBodySchema;
