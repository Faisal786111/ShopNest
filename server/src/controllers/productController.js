const Product = require("../models/Product");
const asyncHandler = require("../middlewares/asyncHandler");

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public 
const getAllProducts = asyncHandler(async (req, res) => {
    const pageSize = 2;
    const page = Number(req.query.pageNumber) || 1;
    const count = await Product.countDocuments({});
    const foundProducts = await Product.find({}).limit(pageSize).skip(pageSize * (page - 1));

    if (!foundProducts) {
        return res.status(404).json({ message: "Products not found." });
    }

    return res.json({ products: foundProducts, page, pages: Math.ceil(count / pageSize) });
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
    if (!deletedProduct) {
        res.status(404);
        throw new Error("Product not found.");
    }

    return res.json(deletedProduct);
});

// @desc    Update single product by Id
// @route   PUT /api/products/:id
// @access  Private / Admin
const updateProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    const { name, price, category, description, countInStock, brand } = req.body;

    console.log(req.body);
    console.log(product);
    if (!product) {
        res.status(404);
        throw new Error("Product not found.");
    }

    product.name = name;
    product.price = price;
    product.category = category;
    product.description = description;
    product.countInStock = countInStock;
    product.brand = brand;

    const updatedProduct = await product.save();

    return res.json(updatedProduct);
});

// @desc    Create review for a product
// @route   POST /api/products/:id/reviews
// @access  Private 
const createReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
        res.status(400);
        throw new Error("Product not found.");
    }

    const alreadyReviewed = await product.reviews.find(review => review.user.toString() === req.user._id.toString());

    if (!alreadyReviewed) {
        const review = {
            user: req.user._id,
            name: req.user.name,
            rating: Number(rating),
            comment,
        };

        // add review to reviews array
        product.reviews.push(review);

        // add number reiviews
        product.numReviews = product.reviews.length;

        // add rating 
        product.rating = product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length;

        // save product
        const reviewedProduct = await product.save();
        console.log(reviewedProduct);
        return res.json({ reviewedProduct, message: "Review added" });
    }

    res.status(400);
    throw new Error("Product already reviewed.");
});

module.exports = { getAllProducts, getProductById, createProduct, deleteProductById, updateProductById, createReview };