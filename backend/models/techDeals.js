const mongoose  = require('mongoose')

//tech Deals schema
const techDeals = mongoose.Schema(
    {
        tvs: [{
            title: String,
            offerPrice: String,
            originalPrice: String,
            percentOff: String,
            productLink: String,
            productImageLink: String,
            soldOn: String
        }],
        laptops: [{
            title: String,
            offerPrice: String,
            originalPrice: String,
            percentOff: String,
            productLink: String,
            productImageLink: String,
            soldOn: String
        }],
        graphicsCards: [{
            title: String,
            offerPrice: String,
            originalPrice: String,
            percentOff: String,
            productLink: String,
            productImageLink: String,
            soldOn: String
        }],
        audio: [{
            title: String,
            offerPrice: String,
            originalPrice: String,
            percentOff: String,
            productLink: String,
            productImageLink: String,
            soldOn: String
        }]
})

module.exports = mongoose.model('techdeals', techDeals)