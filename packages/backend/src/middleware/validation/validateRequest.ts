import { Ajv } from "ajv";
import { NextFunction, Request } from "express";
import addFormats from "ajv-formats";
import addErrors from "ajv-errors";
import loginBodySchema from "./schemas/user/loginSchema";
import signupBodySchema from "./schemas/user/signupSchema";

const ajv = new Ajv({ allErrors: true, $data: true });
addFormats(ajv);
addErrors(ajv);

ajv.addFormat("username", /^[0-9a-zA-Z_]{5,10}$/);

/*
  By using ajv.addSchema, we ensure that schema compilations happen only once,
  but validations happen multiple times, this is best for performance
  The compiled validation functions are available, for example via ajv.getSchema.

  For example key "signupBodySchema" passed to addSchema is used to retrieve
  corresponding schema.
*/
ajv.addSchema(loginBodySchema, "loginBodySchema");
ajv.addSchema(signupBodySchema, "signupBodySchema");

const validateRequest = (
  schema: string,
  request: Request,
  next: NextFunction,
) => {
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
  const valid = validate && validate(request.body);
  if (!valid) {
    let errors: { [key: string]: string | undefined } = {};
    if (validate?.errors) {
      for (const error of validate?.errors) {
        const errorName = error.instancePath.slice(1);
        errors[errorName] = error.message;
      }
      return next({ status: 400, message: errors });
    }
    return next();
  }
};

export default validateRequest;
