const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
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
app.use("/api/orders", orderRoutes);
app.use("/api/uploads", uploadRoutes);
app.use("/api/config/paypal", (req , res)=>{
    return res.json({clientId : process.env.PAYPAL_CLIENT_ID});
});


console.log("paht resolve" , path.resolve());
const dirname = path.resolve();

app.use("/uploads" , express.static(path.join(dirname , "/uploads")));

//  Error middleware
app.use(notFound);
app.use(errorHandler);


app.listen(port, () => {
    console.log("listening on port " + port);
}); 