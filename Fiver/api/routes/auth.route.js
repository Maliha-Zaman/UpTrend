import express from "express";
import {
  register,
  login,
  logout,
  verifytoken,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/:id/verify/:token/", verifytoken);
// import { deleteUser } from "../controllers/user.controller.js";
// import { verifyToken } from "../middleware/jwt.js";

export default router;
