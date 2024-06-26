const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    },
}, {
    timestamps: true,
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}


userSchema.methods.toJSON = function () {
    const user = this.toObject(); // Convert document to plain JS object.
    delete user.password;
    delete user.__v;

    return user;
}

userSchema.pre("save", function (next) {
    console.log("save middlware");
    const user = this;
    if (user.isModified("password")) {
        user.password = bcrypt.hashSync(user.password, 8);
    }
    next();
})

const User = model("User", userSchema);
module.exports = User;