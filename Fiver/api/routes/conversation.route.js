// import express from "express";

// import { verifyToken } from "../middleware/jwt.js";

// const router = express.Router();



// export default router;
import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import {
  createConversation,
  getConversations,
  getSingleConversation,
  updateConversation,
} from "../controllers/conversation.controller.js";

// import { deleteUser } from "../controllers/user.controller.js";
// import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

// router.delete("/:id", verifyToken, deleteUser);
// router.get("/:id", getUser);
router.get("/", verifyToken, getConversations);
router.post("/", verifyToken, createConversation);
router.get("/single/:id", verifyToken, getSingleConversation);
router.put("/:id", verifyToken, updateConversation);
export default router;
