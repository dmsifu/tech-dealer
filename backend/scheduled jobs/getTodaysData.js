const cron = require('node-cron')
const { gotScraping } = require('got-scraping');
const cheerio = require('cheerio');
const ps5Prices = require('../models/ps5Prices')

const gamestopURL = 'https://www.gamestop.com/consoles-hardware/playstation-5/consoles/products/playstation-5/229025.html'
const bestbuyURL = 'https://www.bestbuy.com/site/sony-playstation-5-console/6426149.p'
const neweggURL = 'https://www.newegg.com/p/N82E16868110294'
const walmartURL = 'https://www.walmart.com/ip/PlayStation-5-Console/363472942'
const randomeTimes = [1,2,3,4,5,6,7]

async function getData(url, priceClass, inStockClass, classID){
    try{
        const response = await gotScraping(url)
        const html = response.body
        const $ = cheerio.load(html)

        const price = classID !== '' ? $(priceClass,classID) : $(priceClass)
        const isInStock = $(inStockClass)
        
        const actualPrice = price.text().match(/(\$)? ?([0-9.]+)/)[0]
        const availability = isInStock.text().replace(/[\r\n\t]+/g, ' ').trim()

        return {
            price: actualPrice,
            isAvailable: availability === 'Unavailable' || availability === 'Sold Out' || availability === 'COMING SOON' ? false : true,
            hasFreeShipping: true
        }
    }
    catch(error){
        return await getData(url, priceClass, inStockClass, classID)
    }
}

async function addDataToDB(){
    const gamestopData = await getData(gamestopURL, '.actual-price', '#add-to-cart', '#primary-details')
    const bestbuyData = await getData(bestbuyURL, '.priceView-customer-price', '.fulfillment-add-to-cart-button')
    const neweggData = await getData(neweggURL, '.price-current', '.product-flag')
    const walmartData = await getData(walmartURL, 'span[itemprop = "price"]', 'span:contains("Add to cart")')
    
    const finished = ps5Prices.create({
        gamestop: gamestopData,
        bestbuy: bestbuyData,
        newegg: neweggData,
        walmart: walmartData
    })
}

function scrapeTodaysData() {
    const scheduleGetTodaysData =  cron.schedule('4 7 * * * 1-7', addDataToDB)
    scheduleGetTodaysData.start()
}

module.exports = scrapeTodaysData
