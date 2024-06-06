import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
// import createError from "../utils/createError.js";

export const deleteUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (req.userId !== user._id.toString()) {
    return next(createError(403, "You can delete only your account!"));
  }
  await User.findByIdAndDelete(req.params.id);
  res.status(200).send("deleted");
};
// res.send("from controllers");

// if (req.userId !== user._id.toString()) {
//   return next(createError(403, "You can delete only your account!"));
// }

// res.status(200).send("deleted.");

// export const getUser = async (req, res, next) => {
//   const user = await User.findById(req.params.id);

//   res.status(200).send(user);
// };
export const getUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);

  res.status(200).send(user);
};
