// import express from "express";

// import { verifyToken } from "../middleware/jwt.js";

// const router = express.Router();



// export default router;
import express from "express";
import {
  createMessage,
  getMessages,
} from "../controllers/message.controller.js";
// import { deleteUser } from "../controllers/user.controller.js";
 import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

// router.delete("/:id", verifyToken, deleteUser);
// router.get("/:id", getUser);
router.post("/", verifyToken, createMessage);
router.get("/:id", verifyToken, getMessages);
export default router;
