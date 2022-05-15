const cron = require('node-cron')
const { gotScraping } = require('got-scraping');
const cheerio = require('cheerio');
const techDeals = require('../models/techDeals')

// const gamestopURL = 'https://www.gamestop.com/consoles-hardware/playstation-5/consoles/products/playstation-5/229025.html'
// const bestbuyURL = 'https://www.bestbuy.com/site/sony-playstation-5-console/6426149.p'
// const neweggURL = 'https://www.newegg.com/p/N82E16868110294'
// const walmartURL = 'https://www.walmart.com/ip/PlayStation-5-Console/363472942'

const bestbuyCategoryIDs = {
    tv: 'abcat0101001',
    laptop: 'pcmcat138500050001',
    graphicsCard: 'abcat0507002'
}

// async function getData(url, priceClass, inStockClass, classID){
//     try{
//         const response = await gotScraping(url)
//         const html = response.body
//         const $ = cheerio.load(html)

//         const price = classID !== '' ? $(priceClass,classID) : $(priceClass)
//         const isInStock = $(inStockClass)
        
//         const actualPrice = price.text().match(/(\$)? ?([0-9.]+)/)[0]
//         const availability = isInStock.text().replace(/[\r\n\t]+/g, ' ').trim()

//         return {
//             price: actualPrice,
//             isAvailable: availability === 'Unavailable' || availability === 'Sold Out' || availability === 'COMING SOON' ? false : true,
//             hasFreeShipping: true
//         }
//     }
//     catch(error){
//         return await getData(url, priceClass, inStockClass, classID)
//     }
// }

// async function addDataToDB(){
//     const gamestopData = await getData(gamestopURL, '.actual-price', '#add-to-cart', '#primary-details')
//     const bestbuyData = await getData(bestbuyURL, '.priceView-customer-price', '.fulfillment-add-to-cart-button')
//     const neweggData = await getData(neweggURL, '.price-current', '.product-flag')
//     const walmartData = await getData(walmartURL, 'span[itemprop = "price"]', 'span:contains("Add to cart")')
    
//     const finished = techDeals.create({
//         gamestop: gamestopData,
//         bestbuy: bestbuyData,
//         newegg: neweggData,
//         walmart: walmartData
//     })
//}

async function getTechDealsBestBuy(category){
    try {
        const offers = []
        for(let i = 1; i < 4; i++){
            const res = await gotScraping(`https://www.bestbuy.com/site/searchpage.jsp?_dyncharset=UTF-8&browsedCategory=${category}&cp=${i}&id=pcat17071&iht=n&ks=960&list=y&qp=currentoffers_facet%3DCurrent%20Deals~On%20Sale&sc=Global&st=categoryid%24${category}&type=page&usc=All%20Categories`)
            const $ = cheerio.load(res.body)
            if($('.no-results-message').text().length > 0){break}
            const listOfProducts = $('#main-results')
    
            listOfProducts.find('.list-item.lv').each((i, element) => {
                const name = $(element).find('.sku-title a').text()
                const offerPrice = $(element).find('.priceView-hero-price.priceView-customer-price span[aria-hidden=true]').text()
                const originalPrice = $(element).find('.pricing-price__regular-price-content div[aria-hidden=true]').text().split(' ')[1]
                const productLink = $(element).find('.sku-title a').attr('href')
                const productImageLink = $(element).find('.product-image').attr('src')
                if(offerPrice === '' || originalPrice === undefined || productImageLink === undefined){return}
    
                offers.push({
                    title: name,
                    offerPrice: offerPrice,
                    originalPrice: originalPrice,
                    productLink: `https://www.bestbuy.com${productLink}`,
                    productImageLink: productImageLink,
                })
            })
            setTimeout(()=> {
                return
            }, 1000)
        }
            
        return offers
        
    } catch (error) {
        return {message: error}
    }
}

async function getTechDealsTarget(category){
    try {
        const offers = []
        for(let i = 1; i < 4; i++){
            const res = await gotScraping(`https://www.bestbuy.com/site/searchpage.jsp?_dyncharset=UTF-8&browsedCategory=${category}&cp=${i}&id=pcat17071&iht=n&ks=960&list=y&qp=currentoffers_facet%3DCurrent%20Deals~On%20Sale&sc=Global&st=categoryid%24${category}&type=page&usc=All%20Categories`)
            const $ = cheerio.load(res.body)
            if($('.no-results-message').text().length > 0){break}
            const listOfProducts = $('#main-results')
    
            listOfProducts.find('.list-item.lv').each((i, element) => {
                const name = $(element).find('.sku-title a').text()
                const offerPrice = $(element).find('.priceView-hero-price.priceView-customer-price span[aria-hidden=true]').text()
                const originalPrice = $(element).find('.pricing-price__regular-price-content div[aria-hidden=true]').text().split(' ')[1]
                const productLink = $(element).find('.sku-title a').attr('href')
                const productImageLink = $(element).find('.product-image').attr('src')
                if(offerPrice === '' || originalPrice === undefined || productImageLink === undefined){return}
    
                offers.push({
                    title: name,
                    offerPrice: offerPrice,
                    originalPrice: originalPrice,
                    productLink: `https://www.bestbuy.com${productLink}`,
                    productImageLink: productImageLink,
                })
            })
            setTimeout(()=> {
                return
            }, 1000)
        }
            
        return offers
        
    } catch (error) {
        return {message: error}
    }
}

async function getAllBestBuyDeals(){
    const tvs = await getTechDealsBestBuy(bestbuyCategoryIDs.tv)
    const laptops = await getTechDealsBestBuy(bestbuyCategoryIDs.laptop)
    const graphicsCards = await getTechDealsBestBuy(bestbuyCategoryIDs.graphicsCard)

    const allBestBuyDeals = {
        tvs: tvs,
        laptops: laptops,
        graphicsCards: graphicsCards
    }
    console.log(allBestBuyDeals)
    return allBestBuyDeals
}

function scrapeTodaysData() {
    //getAllBestBuyDeals()
    //const scheduleGetTodaysData =  cron.schedule('4 7 * * * 1-7', addDataToDB)
    //scheduleGetTodaysData.start()
}

module.exports = scrapeTodaysData
