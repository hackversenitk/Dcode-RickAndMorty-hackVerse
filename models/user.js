const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
    },
    publicKey: {
        type: String,
        unique: true
    },
    contest: [String],
});

const User = mongoose.model("User", userSchema);

module.exports = User