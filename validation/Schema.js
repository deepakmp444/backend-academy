import { body } from "express-validator";

const SignupSchema = [
  body("name").isString().isLength({ max: 20 }),
  body("email").isEmail().normalizeEmail(),
  body("mobile").isMobilePhone(),
  body("password").isString().isLength({ min: 6 }),
];

export { SignupSchema };
