const User = require("../models/User");
const asyncHandler = require("../middlewares/asyncHandler");
const generateToken = require("../utils/generateToken");

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

    generateToken(res, user._id);

    return res.json(user);
});

// @desc    Register user
// @route   POST /api/users
// @access  Public 
const registerUser = asyncHandler(async (req, res) => {
    console.log(req.body);
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (!userExists) {
        const user = await User.create({
            name,
            email,
            password
        })

        if (!user) {
            res.status(400);
            throw new Error("Invalid user data.");
        }
        generateToken(res, user._id);

        return res.status(201).json({ message: "User created successfully.", user });
    }

    return res.status(400).json({ message: "User already exists." });
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
    const allowedToUpdates = ["name", "email", "password"];
    const updates = Object.keys(req.body);

    console.log(updates);
    console.log(req.body);


    const isValidToUpdate = updates.every(update => allowedToUpdates.includes(update));

    if (!isValidToUpdate) {
        res.status(400);
        throw new Error("Invalid to update fields.");
    }

    updates.forEach(update =>
        req.user[update] = req.body[update]
    )

    await req.user.save();

    return res.json({ message: "Successfully updated user profile.", user: req.user });
});

// @desc    Get users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    console.log(users);
    if (!users) {
        res.status(404);
        throw new Error("Users not found.");
    }

    return res.json(users);
});

// @desc    Get user by Id
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        res.status(404);
        throw new Error("Users not found.");
    }
    return res.json(user);
});

// @desc    Delete user by Id
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        res.status(404);
        throw new Error("Users not found.");
    }

    const deletedUser = await User.deleteOne({ _id: user._id });
    return res.json(deletedUser);
});

// @desc    Update user by Id
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUserById = asyncHandler(async (req, res) => {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { runValidators: true, new: true });
    console.log(updatedUser);
    if (!updatedUser) {
        res.status(404);
        throw new Error("Users not found.");
    }
    return res.status(201).json(updatedUser);
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
