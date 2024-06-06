import User from "../models/user.model.js";
import createError from "../utils/createError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail.js";
import Token from "../models/token.js";
import getCurrentUser from "../utils/getCurrentUser.js";

export const register = async (req, res, next) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user)
      return res
        .status(409)
        .send({ message: "User with given email already Exist!" });

    if (req.body.password !== req.body.cpassword)
      return res.status(400).send({ message: "Passwords do not match!" }); //throw new Error("Passwords must be same");
        
      const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    if (!passwordRegex.test(req.body.password)) {
      return res.status(400).send({
        message:
          "Password must contain at least 8 characters including uppercase and lowercase letters, numbers, and special symbols.",
      });
    }

    const hash = bcrypt.hashSync(req.body.password, 5);
    const newUser = new User({ ...req.body, password: hash });
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    await newUser.save();
    // res.status(201).send("User has been created.");

    const token = await new Token({
      userId: newUser._id,
      token: crypto.randomBytes(32).toString("hex"),
    }).save();
    const url = `${process.env.BASE_URL}auth/${newUser.id}/verify/${token.token}`;
    await sendEmail(newUser.email, "Verify Email", url);

    // userId: newUser._id, await sendEmail(newUser.email, "Verify Email", url);

    res
      .status(404)
      .send({ message: "An Email sent to your account please verify" });

    //
  } catch (err) {
    next(err);
    //res.status(500).send("Something went wrong. Please try again");
  }
};
//
export const verifytoken = async (req, res, next) => {
  try {

    console.log("99");
    const user = await User.findOne({ _id: req.params.id });
    console.log(user);


    if (!user) return res.status(400).send({ message: "Invalid what link" });
    console.log("user");

    const token = await Token.findOne({
      userId: user._id,

      token: req.params.token,
    });
    if (!token) return res.status(400).send({ message: "Invalid lllink" });
    console.log("to");

    await User.updateOne(
      { _id: user._id },
      {
        $set: {
          verified: true,
        },
      }
    );
    console.log("totyuo");
    // await token.remove(token._id);
    await token.deleteOne();
    console.log("yyyyyyyyy");

    res.send(
      `Email verified successfully.<a href="http://localhost:5173/login">Please click on the link to continue</a>`
    );
  } catch (error) {
    console.error(error);
    // res.status(500).send({ message: "Internal Serverrr Error" });
  }
};


export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user.verified) {
      if (!user) return next(createError(404, "User not found!"));

      const isCorrect = bcrypt.compareSync(req.body.password, user.password);
      if (!isCorrect)
        //return next(createError(400, "Wrong password or username!"));
          res.status(404).send({ message: "Wrong password or username" });

      const token = jwt.sign(
        {
          id: user._id,
          isSeller: user.isSeller,
        },
        process.env.JWT_KEY
      );

      const { password, ...info } = user._doc;
      res
        .cookie("accessToken", token, {
          httpOnly: true,
        })
        .status(200)
        .send(info);
    } else {
      res.status(404).send({ message: "Please verify your account first" });
      console.log("Internal Server Error");
    }
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res) => {
  res
    .clearCookie("accessToken", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .send("User has been logged out.");
};