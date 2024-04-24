const express = require("express");
const router = express.Router();
const { getAllProducts, getProductById, createProduct, deleteProductById } = require("../controllers/productController");
const { auth, admin } = require("../middlewares/authMiddleware");


router.route("/").get(getAllProducts).post(auth, admin, createProduct);

router.route("/:id").get(getProductById).delete(auth , admin , deleteProductById);

module.exports = router;