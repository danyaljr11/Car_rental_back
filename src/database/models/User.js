const { Schema, model, mongoose } = require('mongoose');

const User = model("User", new Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
}, { timestamps : true }));

module.exports = mongoose.model("User") || User;