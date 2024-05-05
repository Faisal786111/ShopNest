const express = require("express");
const router = new express.Router();
const { auth, admin } = require("../middlewares/authMiddleware");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        // Extracting the file extension from the original filename
        const ext = file.originalname.split('.').pop();
        // Appending the unique suffix and file extension to the original filename
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + ext);
    },
});


const upload = multer({
    storage,
    limits: {
        fileSize: 1000000, //1MB
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error("Pleas upload only jpg , jpeg & png images"));
        }

        cb(undefined, true);
    },
});


router.post("/", auth, upload.single("image"), async (req, res) => {
    return res.status(201).json({
        message: "Image uploaded successfully.",
        file: req.file,
        image: `/images/${req.file.filename}`
    })
}, (error, req, res, next) => {
    res.status(400);
    throw new Error(error.message);
});

router.get("/", auth,)


module.exports = router;