import { JSONSchemaType } from "ajv";

interface CategoryBody {
  name: string;
  description: string;
}

const categoryBodySchema: JSONSchemaType<CategoryBody> = {
  type: "object",
  properties: {
    name: { type: "string" },
    description: { type: "string", maxLength: 256 },
  },
  required: ["name"],
  additionalProperties: false,
  errorMessage: {
    properties: {
      description: "Description must NOT have more than 256 characters",
    },
  },
};

export default categoryBodySchema;
