//All product controller logic or functions will go here
const Product = require("../models/product");

const ErrorHandler = require("../utils/errorHandler");

const APIfeatures = require("../utils/apiFeatures");

//importing error handler to handle async function that don't terminate the request
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

exports.newProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({
      success: true,
      Product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//get all products => api/v1/products
//have passed query and querystring to the API feature
exports.getProducts = async (req, res, next) => {
  try {

    let resultsPerPage = 4;

    const apiFeatures = new APIfeatures(Product.find(), req.query)
                        .search()//search with keyword
                        .filter()//search using filter for category
                        .pagination(resultsPerPage)
    const products = await apiFeatures.query
    const productsCount = await Product.countDocuments();

    res.status(200).json({
      success: true,
      count: products.length,
      productsCount,
      resultsPerPage,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//get single product => api/product/:id
exports.getSingleProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }

    return res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//update product => api/v1/product/:id
exports.updateProduct = async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(20).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// delete product => /api/v1/admin/product:id
exports.deleteProduct = async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }
    await product.remove();
    res.status(200).json({
      success: true,
      message: "Product is deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
