const cron = require('node-cron')
const { gotScraping } = require('got-scraping');
const cheerio = require('cheerio');
const techDeals = require('../models/techDeals')

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

async function getAllBestBuyDeals(){
    const tvs = await getTechDealsBestBuy('abcat0101001')
    const laptops = await getTechDealsBestBuy('pcmcat138500050001')
    const graphicsCards = await getTechDealsBestBuy('abcat0507002')

    const allBestBuyDeals = {
        tvs: tvs,
        laptops: laptops,
        graphicsCards: graphicsCards
    }
    console.log(allBestBuyDeals)
    return allBestBuyDeals
}

async function getTechDealsTarget(url){
    try {
        const offers = []
        for(let i = 0; i <= 48; i = i + 24){
            const res = await gotScraping(`${url}?Nao=${i}`)
            const $ = cheerio.load(res.body)
            const listOfProducts = $('#pageBodyContainer div:nth-child(2) div div:nth-child(9) div div.styles__StyledRow-sc-1nuqtm0-0.jsBlib div.styles__StyledCol-sc-ct8kx6-0.kakpde div section div')
            console.log(listOfProducts.text())
    
            // listOfProducts.find('.h-position-relative.h-display-flex.h-flex-direction-col').each((i, element) => {
            //     const name = $(element).find('.Link__StyledLink-sc-4b9qcv-0.styles__StyledTitleLink-sc-h3r0um-1.csEnsr.dAyBrL.h-display-block.h-text-bold.h-text-bs').text()
            //     const offerPrice = $(element).find('.h-text-red[data-test=current-price] span').text()
            //     const originalPrice = $(element).find('.h-text-grayDark.h-text-sm[data-test=comparison-price]').text()
            //     const productLink = $(element).find('.Link__StyledLink-sc-4b9qcv-0.styles__StyledTitleLink-sc-h3r0um-1.csEnsr.dAyBrL.h-display-block.h-text-bold.h-text-bs').attr('href')
            //     const productImageLink = $(element).find('.ProductCardImage__PicturePrimary-sc-rhvnbj-0.DKjpI picture img').attr('src')
            //     if(originalPrice === '' || originalPrice === undefined || productImageLink === undefined){return}
    
            //     offers.push({
            //         title: name,
            //         offerPrice: offerPrice,
            //         originalPrice: originalPrice,
            //         productLink: `https://www.target.com${productLink}`,
            //         productImageLink: productImageLink,
            //     })
            //})
            setTimeout(()=> {
                return
            }, 1000)
        }
            
        return offers
        
    } catch (error) {
        return {message: error}
    }
}

async function getAllTargetDeals(){
    const tvs = await getTechDealsTarget('https://www.target.com/c/tvs-home-theater-electronics/all-deals/-/N-5xtdwZakkosZ55zn7Za6thsZal25lf595yh')
    const laptops = await getTechDealsTarget('https://www.target.com/c/laptops-computers-office-electronics/all-deals/-/N-5xtf4Zakkos')

    // const allTargetDeals = {
    //     tvs: tvs,
    //     laptops: laptops
    // }
    // console.log(allTargetDeals)
    // return allTargetDeals
}

async function getTechDealsNewegg(url){
    const res = await gotScraping(url)
    const $ = cheerio.load(res.body)
    const offers = []
    const listOfProducts = $('.item-cells-wrap.border-cells.items-grid-view.four-cells.expulsion-one-cell')

    listOfProducts.find('.item-container').each((i, element) => {
        const name = $(element).find('.item-title').text()
        const offerPriceOne = $(element).find('.price-current strong').text()
        const offerPriceTwo = $(element).find('.price-current sup').text()
        const originalPrice = $(element).find('.price-was-data').text()
        const productLink = $(element).find('.item-title').attr('href')
        const productImageLink = $(element).find('img').attr('src')
        if(originalPrice === ''){return}

        offers.push({
            title: name,
            offerPrice: `$${offerPriceOne}${offerPriceTwo}`,
            originalPrice: originalPrice,
            productLink: productLink,
            productImageLink: productImageLink,
        })
    })
    
    return offers
}

async function getAllNeweggDeals(){
    const tvs = await getTechDealsNewegg('https://www.newegg.com/p/pl?Submit=StoreIM&Category=59&Depa=10&PageSize=96')
    const laptops = await getTechDealsNewegg('https://www.newegg.com/p/pl?Submit=StoreIM&Category=223&Depa=3&PageSize=96&N=4803%204810')
    const graphicsCards = await getTechDealsNewegg('https://www.newegg.com/p/pl?PageSize=96&N=100007709%204803')

    const allNeweggDeals = {
        tvs: tvs,
        laptops: laptops,
        graphicsCards: graphicsCards
    }
    console.log(allNeweggDeals)
    return allNeweggDeals

}

function scrapeTodaysData() {
    getAllNeweggDeals()
    //getAllTargetDeals()
    //getAllBestBuyDeals()
    //const scheduleGetTodaysData =  cron.schedule('4 7 * * * 1-7', addDataToDB)
    //scheduleGetTodaysData.start()
}

module.exports = scrapeTodaysData
