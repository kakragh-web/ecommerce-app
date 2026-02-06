import express from "express";
import { createOrder, getUserOrders, getAllOrders, updateOrderStatus } from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createOrder);
router.get("/", protect, getUserOrders);
router.get("/all", protect, getAllOrders);
router.put("/:id/status", protect, updateOrderStatus);

export default router;
