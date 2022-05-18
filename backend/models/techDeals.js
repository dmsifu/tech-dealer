const mongoose  = require('mongoose')

const techDeals = mongoose.Schema(
    {
    bestbuy: {
        tvs: [{
            title: String,
            brand: String,
            offerPrice: String,
            originalPrice: String,
            productLink: String,
            productImageLink: String
        }],
        laptops: [{
            title: String,
            brand: String,
            offerPrice: String,
            originalPrice: String,
            productLink: String,
            productImageLink: String
        }],
        graphicsCards: [{
            title: String,
            brand: String,
            offerPrice: String,
            originalPrice: String,
            productLink: String,
            productImageLink: String
        }],
        audio: [{
            title: String,
            brand: String,
            offerPrice: String,
            originalPrice: String,
            productLink: String,
            productImageLink: String
        }]
    },
    newegg: {
        tvs: [{
            title: String,
            brand: String,
            offerPrice: String,
            originalPrice: String,
            productLink: String,
            productImageLink: String
        }],
        laptops: [{
            title: String,
            brand: String,
            offerPrice: String,
            originalPrice: String,
            productLink: String,
            productImageLink: String
        }],
        graphicsCards: [{
            title: String,
            brand: String,
            offerPrice: String,
            originalPrice: String,
            productLink: String,
            productImageLink: String
        }]
    },
    walmart: {
        tvs: [{
            title: String,
            brand: String,
            offerPrice: String,
            originalPrice: String,
            productLink: String,
            productImageLink: String
        }],
        laptops: [{
            title: String,
            brand: String,
            offerPrice: String,
            originalPrice: String,
            productLink: String,
            productImageLink: String
        }],
        audio: [{
            title: String,
            brand: String,
            offerPrice: String,
            originalPrice: String,
            productLink: String,
            productImageLink: String
        }]
    },
    amazon: {
        tvs: [{
            title: String,
            brand: String,
            offerPrice: String,
            originalPrice: String,
            productLink: String,
            productImageLink: String
        }],
        laptops: [{
            title: String,
            brand: String,
            offerPrice: String,
            originalPrice: String,
            productLink: String,
            productImageLink: String
        }],
        graphicsCards: [{
            title: String,
            brand: String,
            offerPrice: String,
            originalPrice: String,
            productLink: String,
            productImageLink: String
        }],
        audio: [{
            title: String,
            brand: String,
            offerPrice: String,
            originalPrice: String,
            productLink: String,
            productImageLink: String
        }]
    },
})

module.exports = mongoose.model('techDeals', techDeals)