import { useEffect, useState } from 'react'
import axios from "axios";
import DealCard from '../components/deals/DealCard'
import '../sass/DealsGrid.scss'

function Home() {

  const [bestTvDeals, setTvBestDeals] = useState([])
  const [bestLaptopDeals, setLaptopBestDeals] = useState([])
  const [bestGraphicsCardDeals, setGraphicsCardBestDeals] = useState([])
  const [bestAudioDeals, setAudioBestDeals] = useState([])

  useEffect(() => {     
    axios.get('/api/deals/bestDeals', {headers: {'Content-Type': 'application/json'}})
        .then(res => res.data)
        .then(data => {
          setTvBestDeals(showDeals(data.tvs))
          setLaptopBestDeals(showDeals(data.laptops))
          setGraphicsCardBestDeals(showDeals(data.graphicsCards))
          setAudioBestDeals(showDeals(data.audio))
        })
        .catch(err => console.log(err))
  
  }, [])

  function showDeals(deals){
    if(deals.length === 0){return}
    return deals.map((deal)=>(
      <DealCard 
        key={deal._id} 
        title={deal.title} 
        offerPrice={deal.offerPrice} 
        originalPrice={deal.originalPrice} 
        percentOff={deal.percentOff}
        productLink={deal.productLink} 
        productImageLink={deal.productImageLink}
        soldOn={deal.soldOn}
      />
    ))
  }

  return (
    <div className='deals-grid-container'>
        <div className='deal-category'>
            <h1>TODAYS BEST TV DEALS</h1>
            <a href="/tvs?page=1">show all tv deals</a>
        </div>
        <div className="deals-grid">
            {bestTvDeals.length === 0 ? <h1>Loading Deals..</h1> : bestTvDeals}
        </div>
        <div className='deal-category'>
            <h1>TODAYS BEST LAPTOP DEALS</h1>
            <a href="/laptops?page=1">show all laptop deals</a>
        </div>
        <div className="deals-grid">
          {bestLaptopDeals.length === 0 ? <h1>Loading Deals..</h1> :bestLaptopDeals}
        </div>
        <div className='deal-category'>
            <h1>TODAYS BEST GRAPHICS CARD DEALS</h1>
            <a href="/graphicscards?page=1">show all graphics card deals</a>
        </div>
        <div className="deals-grid">
          {bestGraphicsCardDeals.length === 0 ? <h1>Loading Deals..</h1> : bestGraphicsCardDeals}
        </div>
        <div className='deal-category'>
            <h1>TODAYS BEST AUDIO DEALS</h1>
            <a href="/audio?page=1">show all audio deals</a>
        </div>
        <div className="deals-grid">
          {bestAudioDeals.length === 0 ? <h1>Loading Deals..</h1> : bestAudioDeals}
        </div>
    </div>
  )
}

export default Home