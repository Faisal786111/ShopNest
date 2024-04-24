const Order = require("../models/Order");
const asyncHandler = require("../middlewares/asyncHandler");

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body;

    if (!orderItems || !orderItems.length) {
        res.status("400");
        throw new Error("No order itmes");
    }

    const order = new Order({
        user: req.user._id,
        orderItems: orderItems.map((x) => ({
            ...x,
            product: x._id,
            _id: undefined
        })),
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    })

    const createdOrder = await order.save();

    return res.status(201).json(createdOrder);
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });

    if (!orders) {
        res.status(404);
        throw new Error("No orders Found.");
    }

    return res.json(orders);
});

// @desc    Get order by Id
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const order = await Order.findById({ _id: id }).populate("user", "name email");
    if (!order) {
        res.status(404);
        throw new Error("No orders Found.");
    }


    return res.json(order);
});

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (!order) {
        res.status(404);
        throw new Error("Order not found.");
    }

    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address,
    }

    const updatedOrder = await order.save();
    console.log("updated order", updatedOrder);
    return res.json(updatedOrder);
});

// @desc    Update order to deliverd
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDeliverd = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        res.status(404);
        throw new Error("Order not found.");
    }

    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();
    return res.json(updatedOrder);
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getAllOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate("user", "id name");
    if (!orders) {
        res.status(404);
        throw new Error("No orders");
    }
    return res.json(orders);
});

module.exports = {
    addOrderItems,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDeliverd,
    getAllOrders,
}