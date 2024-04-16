const User = require("../models/User");
const asyncHandler = require("../middlewares/asyncHandler");
const jwt = require("jsonwebtoken");

// @desc    Auth user & get token
// @route   GET /api/users/login
// @access  Public 
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await user.matchPassword(password))) {
        res.status(401);
        throw new Error("Invalid email and password.");
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "30d" });

    res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict", // to prevent attacks (ex : cross site scripting)
        maxAge: 30 * 24 * 60 * 60 * 1000, //30days
    });

    return res.json(user);
});

// @desc    Register user
// @route   POST /api/users/register
// @access  Public 
const registerUser = asyncHandler(async (req, res) => {

    return res.json("register API");
});

// @desc    Logout user & clear cookie
// @route   POST /api/users/logout
// @access  Private
const logoutUser = asyncHandler(async (req, res) => {
    res.clearCookie("jwt");

    const { name } = req.user;
    return res.json({ message: `${name} Successfully logged out.` });
});

// @desc    Get user profile
// @route   POST /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
    const { user } = req;

    return res.json(user);
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {

    return res.json("update user profile");
});

// @desc    Get users
// @route   POST /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {

    return res.json("get users");
});

// @desc    Get user by Id
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {

    return res.json("get user by id");
});

// @desc    Delete user by Id
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUserById = asyncHandler(async (req, res) => {

    return res.json("delete user");
});

// @desc    Update user by Id
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUserById = asyncHandler(async (req, res) => {

    return res.json("update user");
});

module.exports = {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    getUserById,
    updateUserById,
    deleteUserById
}
