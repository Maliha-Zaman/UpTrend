// import express from "express";
// import { verifyToken } from "../middleware/jwt.js";

// const router = express.Router();

// router.put("/", verifyToken, confirm);

// export default router;
import express from "express";

// import { deleteUser } from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/jwt.js";
import { getOrders, intent, confirm } from "../controllers/order.controller.js";

const router = express.Router();

// router.delete("/:id", verifyToken, deleteUser);
// router.get("/:id", getUser);
//router.post("/:gigId", verifyToken, createOrder);
router.get("/", verifyToken, getOrders);
router.post("/create-payment-intent/:id", verifyToken, intent);
router.post("/confirm", verifyToken, confirm);

export default router;
