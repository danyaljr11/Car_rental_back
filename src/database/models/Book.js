const { Schema, model, mongoose } = require('mongoose');

const Book = model("Book", new Schema({
    car_id: {
        type: Schema.Types.ObjectId,
        ref: 'Car',
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    start: {
        type: String,
        required: true,
    },
    end: {
        type: String,
        required: true,
    },
    read: {
        type: Boolean,
        default: false,
    },
    status: { 
        type: String, 
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending',
    }
}, { timestamps : true }));

module.exports = mongoose.model("Book") || Book;