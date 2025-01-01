import { JSONSchemaType } from "ajv";

interface CategoryBody {
  name: string;
  details: string;
}

const categoryBodySchema: JSONSchemaType<CategoryBody> = {
  type: "object",
  properties: {
    name: { type: "string"},
    details: { type: "string", maxLength: 256 },
  },
  required: ["name"],
  additionalProperties: false,
  errorMessage: {
    properties: {
      details: "Password must NOT have more than 256 characters",
    },
  },
};

export default categoryBodySchema;
