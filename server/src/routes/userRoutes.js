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

const { auth, admin } = require("../middlewares/authMiddleware");

router.post("/login", authUser);

router.route("/").post(registerUser).get(auth , admin , getUsers);

router.post("/logout", auth, logoutUser);

router.route("/profile").get(auth, getUserProfile).put(auth, updateUserProfile);


router.route("/:id").get(auth, admin, getUserById).put(auth, admin, updateUserById).delete(auth, admin, deleteUserById);


module.exports = router;