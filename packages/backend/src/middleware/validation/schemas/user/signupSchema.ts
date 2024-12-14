import { JSONSchemaType } from "ajv";

interface SignupBody {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const signupBodySchema: JSONSchemaType<SignupBody> = {
  type: "object",
  properties: {
    /* Note: "username" is a custom format, see ../validate */
    username: { type: "string", format: "username" },
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
