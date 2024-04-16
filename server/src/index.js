const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const express = require("express");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
dotenv.config();
require("./config/db");
const cors = require("cors");

const port = process.env.PORT || 2000;

const app = express();
const corsOptions = {
    origin: true, // Change this to the origin(s) you want to allow.
    credentials: true, // Indicates that cookies and credentials should be included.
};

app.use(cors(corsOptions));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser middleware
app.use(cookieParser());

app.get("/", (req, res) => {
    res.json({ message: "API is running" });
})
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

//  Error middleware
app.use(notFound);
app.use(errorHandler);


app.listen(port, () => {
    console.log("listening on port " + port);
}); 