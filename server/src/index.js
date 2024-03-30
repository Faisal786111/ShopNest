const express = require("express");
const dotenv = require("dotenv");
const productRouter = require("./routes/productRoute");
dotenv.config();
require("./config/db");
const cors = require("cors");

const port = process.env.PORT || 2000;

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/products", productRouter);

app.listen(port, () => {
    console.log("listening on port " + port);
}); 