const { Schema, model, mongoose } = require('mongoose');

const Brand = model("Brand", new Schema({
    name: {
        type: String,
        required: true,
    },
    picture: {
        type: String,
        required: true,
    }
}, { timestamps : true }));

module.exports = mongoose.model("Brand") || Brand;