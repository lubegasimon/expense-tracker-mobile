import { NextFunction, Request, Response } from "express";
import { Ajv } from "ajv";
import addFormats from "ajv-formats";
import addErrors from "ajv-errors";
import userSchema from "./schemas/userSchema";
import { findUserByEmail } from "../../user/find";

const ajv = new Ajv({ allErrors: true, $data: true });
addFormats(ajv);
addErrors(ajv);

ajv.addFormat("username", /^[0-9a-zA-Z_]{5,10}$/);

/*
  By using ajv.addSchema, we ensure that schema compilations happen only once,
  but validations happen multiple times, this is best for performance
  The compiled validation functions are available, for example via ajv.getSchema.

  For example key "user" passed to addSchema is used to retrieve schemas.
*/
ajv.addSchema(userSchema, "user");

/* validateRequestBody is a middleware to validate request bodies. */
const validateRequestBody = (schema: string) => {
  /*
    ajv.getSchema returns compiled function that we later use to
    validate the request body.
    
    ajv.getSchema call causes the schema compilation to happen only once,
    on the first API call, not at the application start-up time.
    This means the application would start a bit fast, but the first API
    call would be a bit slower. If this is undesirable, you could,
    for example, call ajv.getSchema for all added schemas after they are added,
    then when ajv.getSchema is called inside route handler it would simply get
    compiled validation function from the ajv instance cache.
  */
  const validate = ajv.getSchema(schema);
  return async (request: Request, response: Response, next: NextFunction) => {
    const data = request.body;
    const valid = validate && validate(data);
    if (!valid || data.password !== data.confirmPassword) {
      const errors = validate?.errors;
      response.status(400).json({ error: errors });
      return;
    }
    const rows = await findUserByEmail(data.email);
    if (!!rows) {
      const error = "Email already exists";
      response.status(409).json({ error });
      return;
    }
    next();
  };
};

export default validateRequestBody;