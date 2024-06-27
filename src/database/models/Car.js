const { Schema, model, default: mongoose } = require("mongoose");

const Car = model("Car", new Schema({
    name: {
        type: String,
        required: true
    },
    brand: {
        type: Schema.Types.ObjectId,
        ref: 'Brand',
        required: true
    },
    category: {
        type: String,
        required: true
    },
    pictures: {
        type: [String],
        required: true
    },
    price: {
        type: {
            dayly: {
                type: String,
            },
            weekly: {
                type: String,
            },
            monthly: {
                type: String,
            }
        }, 
    },
    description: {
        type: {
            AR: {
                type: String,
                required: true
            },
            EN: {
                type: String,
                required: true
            },
        },
        required: true
    },
    horse: { 
        type: String, 
        required: true
    },
    model: {
        type: String, 
        required: true
    },
    seatNumber: {
        type: Number, 
        required: true
    },
    topSpeed: {
        type: Number, 
        required: true
    },
    color: {
        type: String,
        required: true
    },
    gear: {
        type: String, 
        required: true
    },
    available: {
        type: Boolean,
        default: true
    },
    availabilityStartDate: {
        type: String,
    },
    availabilityEndDate: {
        type: String,
    }
}, { timestamps : true }))

module.exports = mongoose.model("Car") || Car