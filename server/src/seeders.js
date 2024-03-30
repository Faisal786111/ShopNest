const mongoose = require("mongoose");
const dotenv = require("dotenv");
const colors = require("colors");
const User = require("./models/User");
const Order = require("./models/Order");
const Porduct = require("./models/Product");
const users = require("../data/users");
const products = require("../data/products");
require("./config/db");

dotenv.config();

const importData = async () => {
    try {
        await User.deleteMany();
        await Porduct.deleteMany();
        await Order.deleteMany();

        const createdUsers = await User.insertMany(users);

        const adminUser = createdUsers[0]._id;
        const sampleProducts = products.map(product => ({ ...product, user: adminUser }));

        await Porduct.insertMany(sampleProducts);
        console.log("Data imported.".green.inverse);
        process.exit();
    } catch (e) {
        console.log(`${e}`.red.inverse);
        process.exit(1);
    }
}

const destroyData = async () => {
    try {
        await User.deleteMany();
        await Porduct.deleteMany();
        await Order.deleteMany();

        console.log("Data destroyed.".red.inverse);
        process.exit();
    } catch (e) {
        console.log(`${e}`.red.inverse);
        process.exit(1);
    }
}

if (process.argv[2] === "-d") {
    destroyData();
} else {
    importData();
}
