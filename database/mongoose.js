const mongoose = require("mongoose");

const Product = require("./models/product");

mongoose
  .connect()
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

const createProduct = async (req, res, next) => {
  const createdProduct = new Product({
    name: req.body.name,
    price: req.body.price,
  });

  const result = await createdProduct.save();
  console.log(typeof createdProduct._id);

  res.json(result);
};

const getProducts = async (req, res, next) => {
  const products = await Product.find().exec();
  res.json(products);
};

module.exports.createProduct = createProduct;
module.exports.getProducts = getProducts;
