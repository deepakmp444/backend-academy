import Router from "express";
const router = Router();
import {
  DeleteAccountUser,
  GetAllUser,
  SignUp,
  UpdateNameAndPasswordUser,
} from "../controller/userController.js";
import { SignupSchema } from "../validation/Schema.js";
import SchemaErrors from "../validation/SchemaErrors.js";

router.route("/user").post(SignupSchema, SchemaErrors, SignUp);
router.route("/user").get(GetAllUser);
router.route("/user/:id").delete(DeleteAccountUser);
router.route("/user/:id").put(UpdateNameAndPasswordUser);

export { router as userRoute };
