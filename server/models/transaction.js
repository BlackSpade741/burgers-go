const mongoose = require('mongoose');
const Schema = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId;
const uniqueValidator = require('mongoose-unique-validator');

const Address = new Schema({
    address1: {
        type: String,
        required: true
    },
    address2: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: true
    },
    postal: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    }
})

const Payment = new Schema({
    cardNumber: {
        type: Number,
        required: true
    },
    nameOnCard: {
        type: String,
        required: true
    }, 
    expiryDate: {
        type: String,
        required: true
    }
})

const Order = new Schema({
    name: {
        type: String,
        required: true,
        unique: false
    },
    price: {
        type: Number,
        required: true,
        unique: false
    },
    burger: []
})

const TransactionSchema = new Schema({
    total: {
        type: Number,
        required: true
    }, 
    order: {
        type: [Order],
        required: true
    },
    userId: {
        type: ObjectId,
        required: true
    },
    orderTime: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ["placed", "in progress", "on the way", "delivered", "cancelled"],
        required: true
    },
    address: {
        type: Address,
        required: true
    },
    payment: {
        type: Payment,
        required: true
    }
})

const Transaction = mongoose.model('Transaction', TransactionSchema);

module.exports = { Transaction }