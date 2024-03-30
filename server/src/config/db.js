const mongoose = require("mongoose");
const colors = require("colors")
const dotenv = require("dotenv");
dotenv.config();

console.log(process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI).then((con) => {
    console.log(`MongoDB connected: ${con.connection.host}`.green.inverse);
}).catch((e) => {
    console.log(`Error while connecting to MongoDB ${e.message}`.red.inverse);
})