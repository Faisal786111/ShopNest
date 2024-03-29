const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI).then((con) => {
    console.log(`MongoDB connected: ${con.connection.host}`);
}).catch((e) => {
    console.log(`Error while connecting to MongoDB ${e.message}`);
})