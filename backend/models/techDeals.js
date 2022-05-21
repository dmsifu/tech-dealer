const mongoose  = require('mongoose')

const techDeals = mongoose.Schema(
    {
        tvs: [{
            title: String,
            brand: String,
            offerPrice: String,
            originalPrice: String,
            percentOff: String,
            productLink: String,
            productImageLink: String,
            soldOn: String
        }],
        laptops: [{
            title: String,
            brand: String,
            offerPrice: String,
            originalPrice: String,
            percentOff: String,
            productLink: String,
            productImageLink: String,
            soldOn: String
        }],
        graphicsCards: [{
            title: String,
            brand: String,
            offerPrice: String,
            originalPrice: String,
            percentOff: String,
            productLink: String,
            productImageLink: String,
            soldOn: String
        }],
        audio: [{
            title: String,
            brand: String,
            offerPrice: String,
            originalPrice: String,
            percentOff: String,
            productLink: String,
            productImageLink: String,
            soldOn: String
        }]
})

module.exports = mongoose.model('techDeals', techDeals)