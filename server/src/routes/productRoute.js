const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const asyncHandler = require("../middlewares/asyncHandler");

router.get("/", asyncHandler(async (req, res) => {
    const products = await Product.find({}).select("-__v");
    if (!products) {
        return res.status(404).json({ message: "Not found." });
    }
    return res.json(products);
}));

router.get("/:id", asyncHandler(async (req, res) => {
    const product = await Product.find({ _id: req.params.id }).select("-__v");
    if (!product || product.length === 0) {
        res.status(404);
        throw new Error("Resource not found.");
    }
    console.log(product);
    return res.json(product);
}));

module.exports = router;