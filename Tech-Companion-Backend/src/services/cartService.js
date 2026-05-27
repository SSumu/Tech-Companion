import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

export const getCartService = async (userId) => {
  let cart = await Cart.findOne({ user: userId }).populate({
    path: "items.product",
    select: "name price image stock",
  });

  if (!cart)
    cart = await Cart.create({ user: userId, items: [], totalPrice: 0 });

  return cart;
};

export const addToCartService = async (userId, productId, quantity) => {
  const product = await Product.findById(productId);

  if (!product) throw new Error("Product not found");

  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    cart = await Cart.create({ user: userId, items: [] });
  }

  const existingItem = cart.items.find(
    (item) => item.product.toString() === productId,
  );

  if (existingItem) existingItem.quantity += quantity;
  else cart.items.push({ product: productId, quantity });

  cart.totalPrice = await calculateCartTotal(cart);

  await cart.save();

  return cart;
};

export const updateCartItemService = async (userId, productId, quantity) => {
  const cart = await Cart.findOne({ user: userId });

  if (!cart) throw new Error("Cart not found");

  const item = cart.items.find((item) => item.product.toString() === productId);

  if (!item) throw new Error("Item not found in cart");

  item.quantity = quantity;

  cart.totalPrice = await calculateCartTotal(cart);

  await cart.save();

  return cart;
};

export const removeCartItemService = async (userId, productId) => {
  const cart = await Cart.findOne({ user: userId });

  if (!cart) throw new Error("Cart not found");

  cart.items = cart.items.filter(
    (item) => item.product.toString() !== productId,
  );

  cart.totalPrice = await calculateCartTotal(cart);

  await cart.save();

  return cart;
};

export const clearCartService = async (userId) => {
  const cart = await Cart.findOne({ user: userId });

  if (!cart) throw new Error("Cart not found");

  cart.items = [];
  cart.totalPrice = 0;

  await cart.save();

  return cart;
};

const calculateCartTotal = async (cart) => {
  let total = 0;

  for (const item of cart.items) {
    const product = await Product.findById(item.product);

    if (product) {
      total += product.price * item.quantity;
    }
  }

  return total;
};
