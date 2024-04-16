const express = require("express");
const router = new express.Router();

const {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    getUserById,
    updateUserById,
    deleteUserById
} = require("../controllers/userController");

router.post("/login", authUser);

router.post("/register", registerUser);

router.post("/logout", logoutUser);

router.route("/profile").get(getUserProfile).put(updateUserProfile);

router.get("/", getUsers);

router.route("/:id").get(getUserById).put(updateUserById).delete(deleteUserById);


module.exports = router;