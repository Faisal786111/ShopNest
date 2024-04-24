const Product = require("../models/Product");
const asyncHandler = require("../middlewares/asyncHandler");

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public 
const getAllProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({}).select("-__v");
    if (!products) {
        return res.status(404).json({ message: "Not found." });
    }
    return res.json(products);
});

// @desc    Fetch single product by Id
// @route   GET /api/products/:id
// @access  Public 
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.find({ _id: req.params.id }).select("-__v");
    if (!product || product.length === 0) {
        res.status(404);
        throw new Error("Resource not found.");
    }
    return res.json(product);
});

// @desc    Create a product
// @route   POST /api/products/
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
    const product = await Product({
        name: "sample name",
        price: 0,
        user: req.user._id,
        image: "/images/sample.jpg",
        brand: "sample brand",
        category: "sample category",
        countInStock: 0,
        numReviews: 0,
        description: "sample description",
    });
    
    const createdProduct = await product.save();
    return res.status(201).json(createProduct);
});

// @desc    Delete single product by Id
// @route   DELETE /api/products/:id
// @access  Private / Admin
const deleteProductById = asyncHandler(async (req, res) => {
    const deletedProduct = await Product.findOneAndDelete(req.params.id);
    if(!deletedProduct){
        res.status(404);
        throw new Error("Product not found.");
    }

    return res.json(deletedProduct);
});

module.exports = { getAllProducts, getProductById , createProduct , deleteProductById};