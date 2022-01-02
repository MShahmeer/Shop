const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());
const errorMiddleWare = require('./middlewares/errors');

app.use(express.json());
//Import all the routes 
const products = require("./routes/product");
const auth = require("./routes/auth");

app.use('/api/v1',products);
app.use('/api/v1',auth);

//middleware to handle errors and it should be added after the routes
app.use(errorMiddleWare);
module.exports = app;