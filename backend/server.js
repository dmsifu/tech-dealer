const { gotScraping } = require('got-scraping');
const cheerio = require('cheerio');

const gamestopURL = 'https://www.gamestop.com/consoles-hardware/playstation-5/consoles/products/playstation-5/229025.html'
const bestbuyURL = 'https://www.bestbuy.com/site/sony-playstation-5-console/6426149.p'
const neweggURL = 'https://www.newegg.com/p/N82E16868110294'
const walmartURL = 'https://www.walmart.com/ip/PlayStation-5-Console/363472942'

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
            freeShipping: 'yes'
        }
    }
    catch(error){
        return await getData(url, priceClass, inStockClass, classID)
    }
}

async function logObjects(){
    const gamestop = await getData(gamestopURL, '.actual-price', '#add-to-cart', '#primary-details')
    const bestbuy = await getData(bestbuyURL, '.priceView-customer-price', '.fulfillment-add-to-cart-button')
    const newegg = await getData(neweggURL, '.price-current', '.product-flag')
    const walmart = await getData(walmartURL, 'span[itemprop = "price"]', 'span:contains("Add to cart")')
    
    console.log({gamestop, bestbuy, newegg, walmart})
}

//logObjects()