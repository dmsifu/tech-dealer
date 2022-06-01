const cron = require('node-cron')
const { gotScraping } = require('got-scraping');
const cheerio = require('cheerio');
const techDeals = require('../models/techDeals')

async function scrapeTodaysData() {
    //addDataToDB()
    //const scheduleGetTodaysData =  cron.schedule('4 7 * * * 1-7', addDataToDB)
    //scheduleGetTodaysData.start()
}

async function addDataToDB(){
    try {
        const [tvs, laptops, graphicsCards, audio] = await Promise.all(
            [
                getTvDeals(), 
                getLaptopDeals(),
                getGraphicsCardDeals(),
                getAudioDeals()
            ])
            
        const finished = {
            tvs: tvs,
            laptops: laptops,
            graphicsCards: graphicsCards,
            audio: audio
        }

        await techDeals.findOneAndReplace({_id: '62884208a91fad74a652b810'}, finished)
        console.log('data added to db')
        
    } catch (error) {
        console.log(error)
    }
}

async function getTvDeals(){
    const bestbuyTvs = await getTechDealsBestBuy('abcat0101001')
    const neweggTvs = await getTechDealsNewegg('https://www.newegg.com/p/pl?Submit=StoreIM&Category=59&Depa=10&PageSize=96&N=4803')
    const walmartTvs = await getTechDealsWalmart('https://www.walmart.com/browse/tv-video/shop-tvs-by-size/3944_1060825_2489948?facet=special_offers%3AReduced+Price')
    const amazonTvs = await getTechDealsAmazon('https://www.amazon.com/s?i=electronics&bbn=172659&rh=n%3A172659%2Cp_n_deal_type%3A23566065011&dc&fs=true')

    const allTvs = [...bestbuyTvs, ...neweggTvs, ...walmartTvs, ...amazonTvs]
    return allTvs.sort((a,b)=> parseInt(b['percentOff'].match(/[\d]+/g).join('')) - parseInt(a['percentOff'].match(/[\d]+/g).join('')))
    
}
async function getLaptopDeals(){
    const bestbuyLaptops = await getTechDealsBestBuy('pcmcat138500050001')
    const neweggLaptops = await getTechDealsNewegg('https://www.newegg.com/p/pl?Submit=StoreIM&Category=223&Depa=3&PageSize=96&N=4803')
    const walmartLaptops = await getTechDealsWalmart('https://www.walmart.com/shop/deals/electronics/computers?facet=special_offers%3AReduced+Price%7C%7Cspecial_offers%3ARollback%7C%7Cspecial_offers%3AClearance')
    const amazonLaptops = await getTechDealsAmazon('https://www.amazon.com/s?i=computers&bbn=565108&rh=n%3A565108%2Cp_n_deal_type%3A23566065011&dc&fs=true')
    
    const allLaptops = [...bestbuyLaptops, ...neweggLaptops, ...walmartLaptops, ...amazonLaptops]
    return allLaptops.sort((a,b)=> parseInt(b['percentOff'].match(/[\d]+/g).join('')) - parseInt(a['percentOff'].match(/[\d]+/g).join('')))
}
async function getGraphicsCardDeals(){
    const bestbuyGraphicsCards = await getTechDealsBestBuy('abcat0507002')
    const neweggGraphicsCards = await getTechDealsNewegg('https://www.newegg.com/p/pl?PageSize=96&N=100007709%204803&Order=3')
    const amazonGraphicsCards = await getTechDealsAmazon('https://www.amazon.com/s?i=computers&bbn=17923671011&rh=n%3A172282%2Cn%3A541966%2Cn%3A193870011%2Cn%3A17923671011%2Cn%3A284822%2Cp_n_deal_type%3A23566065011')

    const allGraphicsCards = [...bestbuyGraphicsCards, ...neweggGraphicsCards, ...amazonGraphicsCards]
    return allGraphicsCards.sort((a,b)=> parseInt(b['percentOff'].match(/[\d]+/g).join('')) - parseInt(a['percentOff'].match(/[\d]+/g).join('')))
}
async function getAudioDeals(){
    const bestbuyAudio = await getTechDealsBestBuy('pcmcat144700050004')
    const amazonAudio = await getTechDealsAmazon('https://www.amazon.com/s?k=Over-Ear+Headphones&i=electronics&rh=n%3A12097479011%2Cp_n_deal_type%3A23566065011&s=review-rank')
    const walmartAudio = await getTechDealsWalmart('https://www.walmart.com/shop/deals/electronics/headphones-speakers-and-video?facet=special_offers%3AReduced+Price%7C%7Cspecial_offers%3ARollback')
    const amazonAudio2 = await getTechDealsAmazon('https://www.amazon.com/s?i=electronics&bbn=172541&rh=n%3A172541%2Cp_n_feature_four_browse-bin%3A12097501011%2Cp_n_deal_type%3A23566065011&lo=image')

    const allAudio = [...bestbuyAudio, ...walmartAudio, ...amazonAudio, ...amazonAudio2]
    return allAudio.sort((a,b)=> parseInt(b['percentOff'].match(/[\d]+/g).join('')) - parseInt(a['percentOff'].match(/[\d]+/g).join('')))
}

async function getTechDealsBestBuy(category){
    try {
        const offers = []
        for(let i = 1; i < 10; i++){
            setTimeout(()=>{
                return 
            }, Math.floor(Math.random() * 3000) + 1000)

            const res = await gotScraping(`https://www.bestbuy.com/site/searchpage.jsp?_dyncharset=UTF-8&browsedCategory=${category}&cp=${i}&id=pcat17071&iht=n&ks=960&list=y&qp=currentoffers_facet%3DCurrent%20Deals~On%20Sale&sc=Global&st=categoryid%24${category}&type=page&usc=All%20Categories`)
            const $ = cheerio.load(res.body)
            if($('.no-results-message').text().length > 0){break}
            const listOfProducts = $('#main-results')
    
            listOfProducts.find('.list-item.lv').each((i, element) => {
                const name = $(element).find('.sku-title a').text()
                if(name.includes('Glasses')){return}
                const offerPrice = $(element).find('.priceView-hero-price.priceView-customer-price span[aria-hidden=true]').text()
                const originalPrice = $(element).find('.pricing-price__regular-price-content div[aria-hidden=true]').text().split(' ')[1]
                const productLink = $(element).find('.sku-title a').attr('href')
                const productImageLink = $(element).find('.product-image').attr('src')
                if(offerPrice === '' || originalPrice === undefined || productImageLink === undefined){return}
                const percentOff = 100 - Math.floor(parseFloat(offerPrice.match(/[.\d]+/g).join('')) / parseFloat(originalPrice.match(/[.\d]+/g).join('')) * 100)
    
                offers.push({
                    title: name,
                    offerPrice: offerPrice,
                    originalPrice: originalPrice,
                    percentOff: `${percentOff}%`,
                    productLink: `https://www.bestbuy.com${productLink}`,
                    productImageLink: productImageLink,
                    soldOn: 'Bestbuy'
                })
            })
            
        }
        return offers
        
    } catch (error) {
        return {message: error}
    }
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
            if(originalPrice === '' || offerPriceOne === '' || offerPriceTwo === ''){return}
            const offerPrice = `$${offerPriceOne}${offerPriceTwo}`
            const percentOff = 100 - Math.floor(parseFloat(offerPrice.match(/[.\d]+/g).join('')) / parseFloat(originalPrice.match(/[.\d]+/g).join('')) * 100)

    
            offers.push({
                title: name,
                offerPrice: offerPrice,
                originalPrice: originalPrice,
                percentOff: `${percentOff}%`,
                productLink: productLink,
                productImageLink: productImageLink,
                soldOn: 'Newegg'
            })
        })
        return offers
        
    } catch (error) {
        return {message: error}
    }
}

async function getTechDealsWalmart(url){
    try {
        const offers = []
        for (let i = 1; i < 10; i++) {
            setTimeout(()=>{
                return 
            }, Math.floor(Math.random() * 3000) + 1000)

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
                const percentOff = 100 - Math.floor(parseFloat(offerPrice.match(/[.\d]+/g).join('')) / parseFloat(originalPrice.match(/[.\d]+/g).join('')) * 100)
        
                offers.push({
                    title: name,
                    offerPrice: offerPrice,
                    originalPrice: originalPrice,
                    percentOff: `${percentOff}%`,
                    productLink: `https://www.walmart.com/${productLink}`,
                    productImageLink: productImageLink,
                    soldOn: 'Walmart'
                })
            })
            
        }
        return offers
        
    } catch (error) {
        return {message: error}
    }
}

async function getTechDealsAmazon(url){
    try {
        const offers = []
        for (let i = 1; i < 10; i++) {
            setTimeout(()=>{
                return 
            }, Math.floor(Math.random() * 3000) + 1000)
    
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
                const percentOff = 100 - Math.floor(parseFloat(offerPrice.match(/[.\d]+/g).join('')) / parseFloat(originalPrice.match(/[.\d]+/g).join('')) * 100)
        
                offers.push({
                    title: name,
                    offerPrice: offerPrice,
                    originalPrice: originalPrice,
                    percentOff: `${percentOff}%`,
                    productLink: `https://www.amazon.com/${productLink}`,
                    productImageLink: productImageLink,
                    soldOn: 'Amazon'
                })
            })
        }
        return offers

    } catch (error) {
        return {message: error}
    }
}


module.exports = scrapeTodaysData
