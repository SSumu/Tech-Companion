import Product from "../models/Product.js";

export const createProductService = async (productData) => {
  const product = await Product.create(productData);

  return product;
};

export const getAllProductsService = async () => {
  const products = await Product.find()
    .populate("category", "name")
    .populate("brand", "name")
    .sort({ createdAt: -1 });

  return products;
};

export const getProductByIdService = async (productId) => {
  const product = await Product.findById(productId)
    .populate("category", "name")
    .populate("brand", "name");

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
};

export const updateProductService = async (productId, updateData) => {
  const product = await Product.findByIdAndUpdate(productId, updateData, {
    new: true,
    runValidators: true,
  });

  if (!product) throw new Error("Product not found");

  return product;
};

export const deleteProductService = async (productId) => {
  const product = await Product.findByIdAndDelete(productId);

  if (!product) throw new Error("Product not found");

  return product;
};

export const getProductsByCategoryService = async (categoryId) => {
  const products = await Product.find({ category: categoryId });

  return products;
};

export const searchProductsService = async (keyword) => {
  const products = await Product.find({
    name: { $regex: keyword, $options: "i" },
  });

  return products;
};
