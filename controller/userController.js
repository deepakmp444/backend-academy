import { db, ObjectId } from "../db/connection.js";
const collection = db.collection("user");

const SignUp = async (req, res) => {
  const { name, mobile, email, password } = req.body;
  try {
    await collection.insertOne({
      name,
      mobile,
      email,
      password,
    });
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const GetAllUser = async (req, res) => {
  try {
    let results = await collection.find().limit(10).toArray();
    res.status(200).json({ success: true, results });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const DeleteAccountUser = async (req, res) => {
  const id = req.params.id;
  try {
    if (ObjectId.isValid(id)) {
      await collection.deleteOne({ _id: new ObjectId(id) });
      res.status(200).json({ success: true });
    } else {
      throw Error("Params Errors");
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const UpdateNameAndPasswordUser = async (req, res) => {
  const { name, password, repassword } = req.body;
  const id = req.params.id;
  try {
    if (ObjectId.isValid(id)) {
      if (name && !password) {
        const nameUpdated = await collection.updateOne(
          { _id: new ObjectId(id) },
          { $set: { name: name } }
        );
        return res.status(200).json({ success: true, nameUpdated });
      }

      if (password && !name) {
        if (!repassword) {
          return res.status(200).json({
            success: false,
            message: "Enter old password",
          });
        }
        if (password !== repassword) {
          return res.status(200).json({
            success: false,
            message: "password and old password does not match",
          });
        }
        const passwordUpdated = await collection.updateOne(
          { _id: new ObjectId(id) },
          { $set: { password: password } }
        );
        return res.status(200).json({ success: true, passwordUpdated });
      }

      if (name && password && repassword) {
        if (password !== repassword) {
          return res.status(200).json({
            success: false,
            message: "password and old password does not match",
          });
        }

        const nameAndPasswordUpdated = await collection.updateOne(
          { _id: new ObjectId(id) },
          { $set: { name: name, password: password } }
        );
        return res.status(200).json({ success: true, nameAndPasswordUpdated });
      }
    } else {
      throw Error("Params Errors");
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export { SignUp, GetAllUser, DeleteAccountUser, UpdateNameAndPasswordUser };
