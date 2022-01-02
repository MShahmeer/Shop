const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please enter product name'],
        trim: true,
        maxLength: [1000, 'product name can not exceed 100 characters']
    },
    price: {
        type: Number,
        required: [true, 'please enter product price'],
        maxLength: [5, 'product name can not exceed 5 characters'],
        default: 0.0
    },
    description: {
        type: String,
        required: [true, 'please enter product description'],
    },
    rating: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type:String,
                required: true
            },
            url: {
                type: String,
                required: true
            },
        }
    ],
    category:{
        type: String,
        required:[true,"Please set the category for the product"],
        enum: {
            values:[
                "Electronics",
                "Cameras",
                "Laptop",
                "Accessories",
                "HeadPhone",
                "Books",
                "Food",
                "Clothes/Shoes",
                "Beauty/Health",
                "Sports",
                "outdoors",
                "Home"
            ],
            message: "Please select correct category"
        }
    },
    seller: {
        type: String,
        required: [true, "please enter prouduct seller"]
    },
    stock: {
        type: Number,
        required: [true, "please enter the stock"],
        maxLength: [5, "Product name can not exceed 5 character"],
        default: 0
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            name:{
                type: String,
                required: true
            },
            rating:{
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
    
})

module.exports = mongoose.model('Product', productSchema);