import Cart from "../models/Cart.js";
import Order from "../models/Order.js";

export const createOrderService = async (
  userId,
  shippingAddress,
  paymentMethod,
) => {
  const cart = await Cart.findOne({ user: userId }).populate("items.product");

  if (!cart || cart.items.length === 0) {
    throw new Error("Cart is empty");
  }

  const orderItems = cart.items.map((item) => ({
    product: item.product._id,
    quantity: item.quantity,
    price: item.product.price,
  }));

  const order = await Order.create({
    user: userId,
    items: orderItems,
    totalAmount: cart.totalPrice,
    shippingAddress,
    paymentMethod,
  });

  cart.items = [];
  cart.totalPrice = 0;

  await cart.save();

  return order;
};

export const getUserOrdersService = async (userId) => {
  const orders = await Order.find({ user: userId })
    .populate("items.product", "name price image")
    .sort({ createdAt: -1 });

  return orders;
};

export const getOrderByIdService = async (orderId) => {
  const order = await Order.findById(orderId)
    .populate("user", "name email")
    .populate("items.product", "name price image");

  if (!order) throw new Error("Order not found");

  return order;
};

export const cancelOrderService = async (orderId) => {
  const order = await Order.findById(orderId);

  if (!order) {
    throw new Error("Order not found");
  }

  order.status = "Cancelled";

  await order.save();

  return order;
};
