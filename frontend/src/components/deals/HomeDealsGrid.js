import { useEffect, useState } from 'react'


function HomeDealsGrid({ tvDeals, laptopDeals, graphicsCardDeals, audioDeals }) {

    function showDeals(dealArray){
        const dealsShown = []
        for (let i = 0; i < 12; i++) {
            dealsShown.push(dealArray[i])
        }
        return dealsShown
    }

  return (
    <div className='deals-grid-container'>
        <div className='deal-category'>
            <h1>TODAYS BEST TV DEALS</h1>
            <a href="/tvs">show all tv deals</a>
        </div>
        <div className="deals-grid">
            
        </div>
        <div className='deal-category'>
            <h1>TODAYS BEST LAPTOP DEALS</h1>
            <a href="/laptops">show all laptop deals</a>
        </div>
        <div className="deals-grid">
            
        </div>
        <div className='deal-category'>
            <h1>TODAYS BEST GRAPHICS CARD DEALS</h1>
            <a href="/graphicscards">show all graphics card deals</a>
        </div>
        <div className="deals-grid">
            
        </div>
        <div className='deal-category'>
            <h1>TODAYS BEST AUDIO DEALS</h1>
            <a href="/audio">show all audio deals</a>
        </div>
        <div className="deals-grid">
            
        </div>
    </div>
  )
}

export default HomeDealsGrid