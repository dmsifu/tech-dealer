const cron = require('node-cron')
const { gotScraping } = require('got-scraping');
const cheerio = require('cheerio');
const techDeals = require('../models/techDeals')

function scrapeTodaysData() {
    //const scheduleGetTodaysData =  cron.schedule('4 7 * * * 1-7', addDataToDB)
    //scheduleGetTodaysData.start()
}

async function addDataToDB(){
    try {
        const [bestbuy, newegg, walmart, amazon] = await Promise.all(
            [
                getAllBestBuyDeals(), 
                getAllNeweggDeals(),
                getAllWalmartDeals(),
                getAllAmazonDeals()
            ])
        
        const finished = techDeals.create({
            bestbuy: bestbuy,
            newegg: newegg,
            walmart: walmart,
            amazon: amazon
        })

        await techDeals.findOneAndUpdate({_id: '6285462611f14ac297de8853'},finished)
        console.log('data added to db')
        
    } catch (error) {
        console.log(error)
    }
}

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
            setTimeout(()=>{
                return 
            }, Math.floor(Math.random() * 3000) + 1000)
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
    const audio = await getTechDealsBestBuy('pcmcat144700050004')

    const allBestBuyDeals = {
        tvs: tvs,
        laptops: laptops,
        graphicsCards: graphicsCards,
        audio: audio
    }
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
            setTimeout(()=>{
                return 
            }, Math.floor(Math.random() * 3000) + 1000)
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
    try {
        setTimeout(()=>{
            return 
        }, Math.floor(Math.random() * 3000) + 1000)
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
        
    } catch (error) {
        return {message: error}
    }
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
    return allNeweggDeals

}

async function getTechDealsWalmart(url){
    try {
        const offers = []
        for (let i = 1; i < 6; i++) {
            setTimeout(()=>{
                return 
            }, Math.floor(Math.random() * 2000) + 1000)
            const res = await gotScraping(`${url}&page=${i}&affinityOverride=default`)
            const $ = cheerio.load(res.body)
            const listOfProducts = $('.flex.flex-wrap.w-100.flex-grow-0.flex-shrink-0.ph2.pr0-xl.pl4-xl.mt0-xl.mt3')
            if($('.mid-gray.lh-copy.mb7.tc').text().length > 0){break}
        
            listOfProducts.find('.sans-serif.mid-gray.relative.flex.flex-column.w-100').each((i, element)=>{
                const name = $(element).find('.f6.f5-l.normal.dark-gray.mb0.mt1.lh-title').text()
                const offerPrice = $(element).find('.b.black.f5.mr1.mr2-xl.lh-copy.f4-l').text()
                const originalPrice = $(element).find('.f7.f6-l.strike.gray.mr3').text()
                const productLink = $(element).find('.sans-serif.mid-gray.relative.flex.flex-column.w-100 a').attr('href')
                const productImageLink = $(element).find('img').attr('src')
                if(originalPrice === ''){return}
        
                offers.push({
                    title: name,
                    offerPrice: offerPrice,
                    originalPrice: originalPrice,
                    productLink: `https://www.walmart.com/${productLink}`,
                    productImageLink: productImageLink,
                })
            })
            
        }
        return offers
        
    } catch (error) {
        return {message: error}
    }
}

async function getAllWalmartDeals(){
    const tvs = await getTechDealsWalmart('https://www.walmart.com/browse/tv-video/shop-tvs-by-size/3944_1060825_2489948?facet=special_offers%3AReduced+Price')
    const laptops = await getTechDealsWalmart('https://www.walmart.com/shop/deals/electronics/computers?facet=special_offers%3AReduced+Price%7C%7Cspecial_offers%3ARollback%7C%7Cspecial_offers%3AClearance')
    const audio = await getTechDealsWalmart('https://www.walmart.com/shop/deals/electronics/headphones-speakers-and-video?facet=special_offers%3AReduced+Price%7C%7Cspecial_offers%3ARollback')

    const allWalmartDeals = {
        tvs: tvs,
        laptops: laptops,
        audio: audio
    }
    return allWalmartDeals

}

async function getTechDealsAmazon(url){
    try {
        const offers = []
        for (let i = 1; i < 6; i++) {
            setTimeout(()=>{
                return 
            }, Math.floor(Math.random() * 2000) + 1000)
    
            const res = await gotScraping(`${url}&page=${i}`)
            const $ = cheerio.load(res.body)
            const listOfProducts = $('.s-main-slot.s-result-list.s-search-results.sg-row')
        
            listOfProducts.find('.a-section.a-spacing-base').each((i,element)=>{
                const name = $(element).find('.a-size-base-plus.a-color-base.a-text-normal').text()
                const offerPrice = $(element).find('.a-price[data-a-color=base] .a-offscreen').text()
                const originalPrice = $(element).find('.a-price[data-a-color=secondary] .a-offscreen').text()
                const productLink = $(element).find('.a-link-normal.s-underline-text.s-underline-link-text.s-link-style.a-text-normal').attr('href')
                const productImageLink = $(element).find('.s-image').attr('src')
                if(originalPrice === ''){return}
        
                offers.push({
                    title: name,
                    offerPrice: offerPrice,
                    originalPrice: originalPrice,
                    productLink: `https://www.amazon.com/${productLink}`,
                    productImageLink: productImageLink
                })
            })
            
            
        }
        return offers

    } catch (error) {
        return {message: error}
    }

}

async function getAllAmazonDeals(){
    const tvs = await getTechDealsAmazon('https://www.amazon.com/s?i=electronics&bbn=172659&rh=n%3A172659%2Cp_n_deal_type%3A23566065011&dc&fs=true')
    const laptops = await getTechDealsAmazon('https://www.amazon.com/s?i=computers&bbn=565108&rh=n%3A565108%2Cp_n_deal_type%3A23566065011&dc&fs=true')
    const graphicsCards = await getTechDealsAmazon('https://www.amazon.com/s?i=computers&bbn=17923671011&rh=n%3A172282%2Cn%3A541966%2Cn%3A193870011%2Cn%3A17923671011%2Cn%3A284822%2Cp_n_deal_type%3A23566065011')
    const audio = await getTechDealsAmazon('https://www.amazon.com/s?k=headphones&i=electronics&rh=p_n_deal_type%3A23566065011&dc')

    const allAmazonDeals = {
        tvs: tvs,
        laptops: laptops,
        graphicsCards: graphicsCards,
        audio: audio
    }
    return allAmazonDeals
}



module.exports = scrapeTodaysData
