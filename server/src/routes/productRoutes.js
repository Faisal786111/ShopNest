const express = require("express");
const router = express.Router();
const { getAllProducts, getProductById, createProduct, deleteProductById, updateProductById, createReview, getTopRatedProducts } = require("../controllers/productController");
const { auth, admin } = require("../middlewares/authMiddleware");


router.route("/").get(getAllProducts).post(auth, admin, createProduct);
router.get("/top", getTopRatedProducts);

router.route("/:id").get(getProductById).put(auth, admin, updateProductById).delete(auth, admin, deleteProductById);

router.route("/:id/reviews").post(auth, createReview);

module.exports = router;