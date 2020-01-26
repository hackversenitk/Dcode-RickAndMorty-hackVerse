const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contest = new Schema({
    id: {
        type: Schema.Types.ObjectId,
        ref: "contests"
    },
    contestName: {
        type: String,
        unique: true,
    },
    users: [String],
    countDown: {
        type: Date,
    }
});




module.exports = contestSchema = mongoose.model("contests", contest);