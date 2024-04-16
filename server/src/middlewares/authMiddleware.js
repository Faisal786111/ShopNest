const jwt = require("jsonwebtoken");
const User = require("../models/User");
const asyncHandler = require("./asyncHandler");

const auth = asyncHandler(async (req, res, next) => {
    // Read jwt from cookies
    const token = req.cookies.jwt;

    if (!token) {
        res.status(401);
        throw new Error("Not authorized. Token failed.");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById({ _id: decoded.userId });
    next();
});

const admin = (req, res, next) => {
    console.log(req.user);
    if (!req.user || !req.user.isAdmin) {
        res.status(401);
        throw new Error("Not authorized as Admin.");
    }

    next();
}

module.exports = { auth, admin };