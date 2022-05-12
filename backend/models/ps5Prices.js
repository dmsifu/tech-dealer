const mongoose  = require('mongoose')

const ps5PricesSchema = mongoose.Schema(
    {
    gamestop: {
        price: String,
        isAvailable: Boolean,
        hasFreeShipping: Boolean
    },
    bestbuy: {
        price: String,
        isAvailable: Boolean,
        hasFreeShipping: Boolean
    },
    newegg: {
        price: String,
        isAvailable: Boolean,
        hasFreeShipping: Boolean
    },
    walmart: {
        price: String,
        isAvailable: Boolean,
        hasFreeShipping: Boolean
    }
})

module.exports = mongoose.model('ps5Prices', ps5PricesSchema)