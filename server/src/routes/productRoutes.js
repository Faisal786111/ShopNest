const express = require("express");
const router = express.Router();
const { getAllProducts, getProductById, createProduct, deleteProductById, updateProductById } = require("../controllers/productController");
const { auth, admin } = require("../middlewares/authMiddleware");


router.route("/").get(getAllProducts).post(auth, admin, createProduct);

router.route("/:id").get(getProductById).put(auth, admin, updateProductById).delete(auth, admin, deleteProductById);

module.exports = router;