const express = require("express");
const router = new express.Router();
const { auth, admin } = require("../middlewares/authMiddleware");
const {
    addOrderItems,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDeliverd,
    getAllOrders,
} = require("../controllers/orderController");

router.route("/").post(auth, addOrderItems).get(auth, admin, getAllOrders);

router.route("/mine").get(auth, getMyOrders);

router.route("/:id").get(auth,  getOrderById);

router.route("/:id/pay").put(auth, updateOrderToPaid);

router.route("/:id/deliver").put(auth, admin, updateOrderToDeliverd);

module.exports = router;