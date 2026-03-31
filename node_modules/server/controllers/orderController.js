// ==============================
// Order Controller
// ==============================
import Order from "../models/Order.js";

export const createOrder = async (req, res) => {
  const { customerName, phone, email, address, note, items, totalAmount } = req.body;
  if (!customerName || !phone || !address || !items?.length) {
    return res.status(400).json({ message: "Please fill required order fields" });
  }
  const order = await Order.create({ customerName, phone, email, address, note, items, totalAmount });
  res.status(201).json({ message: "Order placed successfully", order });
};

export const getOrders = async (_req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  res.json(orders);
};

export const updateOrderStatus = async (req, res) => {
  const order = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true, runValidators: true });
  if (!order) return res.status(404).json({ message: "Order not found" });
  res.json(order);
};
