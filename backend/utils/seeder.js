//this is the file created to send all the products stored in products.json file to check our api
const Product = require("../models/product");
const dotenv = require("dotenv");
const connectDatabase = require("../config/database");

const products = require("../data/products");
const {connect} = require('mongoose');


//setting dotenv file
dotenv.config({ path: "backend/config/config.env" });

connectDatabase();

const seedProducts = async () => {
  try {
    await Product.deleteMany();
    console.log("products are deleted");
    await Product.insertMany(products);
    console.log("All products are added");
    process.exit();
  } catch (error) {
    console.log(error.message);
    process.exit();
  }
};

seedProducts();