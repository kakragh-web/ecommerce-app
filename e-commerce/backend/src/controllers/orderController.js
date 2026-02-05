import Order from "../models/Order.js";

export const createOrder = async (req, res) => {
  try {
    const order = await Order.create({
      userId: req.user.userId,
      products: req.body.products,
      totalAmount: req.body.totalAmount,
      paymentStatus: req.body.paymentStatus || "pending",
      paymentIntentId: req.body.paymentIntentId
    });
    res.status(201).json(order);
  } catch (error) {
    console.error('Create order error:', error);
    res.status(400).json({ message: "Failed to create order" });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error('Get user orders error:', error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

// Admin function to get all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error('Get all orders error:', error);
    res.status(500).json({ message: "Failed to fetch all orders" });
  }
};

// Admin function to update order status
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
    
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid order status" });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { orderStatus: status },
      { new: true }
    ).populate('userId', 'name email');
    
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    
    res.json(order);
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(400).json({ message: "Failed to update order status" });
  }
};
