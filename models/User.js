const mongoose = require("mongoose");

const useSchema = mongoose.Schema({
    name: { type: String },
    password: { type: String },
    email: { type: String },
    profileImage: { type: String }
}, {
    timestamps: true
});

const User = mongoose.model("User", useSchema);
module.exports = User;