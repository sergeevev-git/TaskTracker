const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
    title: { type: String, required: true },
    text: { type: String, required: true },
    deadline: { type: Date, required: true, default: Date.now },
    inwork: false,
    important: false,
    completed: false,
    user: { type: Types.ObjectId, ref: "User" },
});

module.exports = model("Todo", schema);
