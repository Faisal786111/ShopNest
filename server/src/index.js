const express = require("express");
const products = require("../data/products");
const dotenv = require("dotenv");
dotenv.config();
require("./config/db");
const cors = require("cors");
const port = process.env.PORT || 2000;

const app = express();

app.use(cors());

app.get("/api/products", (req, res) => {
    res.json( products );
})

app.get("/api/products/:id", (req, res) => {
    const product = products.find(product => product._id === req.params.id);
    console.log(product);
    res.json( product );
})

app.listen(port, () => {
    console.log("listening on port " + port);
}); 