const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deliverySchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        maxlength: 50
    },
    contact: {
        type: Number
    },
    street: {
        type: String
    },
    state: {
        type: String
    },
    city: {
        type: String
    },
    zip: {
        type: Number,
        maxlength: 100,
        default: 0
    },
}, { timestamps: true })

const Delivery = mongoose.model('Delivery', deliverySchema);

module.exports = { Delivery }
