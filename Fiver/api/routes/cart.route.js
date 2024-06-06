import express from "express";
import { getfromcart, posttocart,deletefromcart } from "../controllers/cart.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

// router.get("/:id", verifyToken, getfromcart);
router.get("/", verifyToken, getfromcart);

router.post("/:id", verifyToken, posttocart);
router.delete("/:id", verifyToken, deletefromcart);

// router.post("/login", login);
// router.post("/logout", logout);
// router.get("/:id/verify/:token/", verifytoken);
// import { deleteUser } from "../controllers/user.controller.js";
// import { verifyToken } from "../middleware/jwt.js";

export default router;
