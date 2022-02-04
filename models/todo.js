const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
    title: { type: String, required: true },
    text: { type: String, required: true },
    deadline: { type: Date, required: true, default: Date.now },
    status: { type: String, required: true, default: "new" },
    important: false,
    user: { type: Types.ObjectId, ref: "User" },
});

module.exports = model("Todo", schema);
