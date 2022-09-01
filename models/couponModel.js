const mongoose = require('mongoose')

const couponSchema = new mongoose.Schema({
    code: {
        type: String,
        required: [true, 'A coupon must have a code'],
        unique: true,
    },
    percentOff: {
        type: Number,
        validate: {
            validator: function () {
                return this.percentOff != null || this.amountOff != null
            },
            message: 'A coupon must have the percentOff or amountOff',
        },
    },
    amountOff: {
        type: Number,
        validate: {
            validator: function () {
                return this.percentOff != null || this.amountOff != null
            },
            message: 'A coupon must have percentOff or amountOff',
        },
    },
    products: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Product',
        },
    ],
    collections: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Collection',
        },
    ],
    expiresIn: {
        type: Date,
        required: [true, 'A coupon must have an expire date'],
    },
})

const Coupon = mongoose.model('Coupon', couponSchema)
module.exports = Coupon
