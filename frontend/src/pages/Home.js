import { useEffect, useState } from 'react'
import axios from "axios";
import DealCard from '../components/DealCard'
import '../sass/DealsGrid.scss'
import LoadingCard from '../components/LoadingCard';

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

  function showLoad(){
    return [1,2,3,4,5,6,7,8].map((e,i)=> <LoadingCard key={i}/>)
  }

  return (
    <div className='deals-grid-container'>
        <div className='deal-category'>
            <h1>TODAYS BEST TV DEALS</h1>
            <a href="/tvs?page=1">show all tv deals</a>
        </div>
        <div className="deals-grid">
            {bestTvDeals.length === 0 ? showLoad() : bestTvDeals}
        </div>
        <div className='deal-category'>
            <h1>TODAYS BEST LAPTOP DEALS</h1>
            <a href="/laptops?page=1">show all laptop deals</a>
        </div>
        <div className="deals-grid">
          {bestLaptopDeals.length === 0 ? showLoad() :bestLaptopDeals}
        </div>
        <div className='deal-category'>
            <h1>TODAYS BEST GRAPHICS CARD DEALS</h1>
            <a href="/graphicscards?page=1">show all graphics card deals</a>
        </div>
        <div className="deals-grid">
          {bestGraphicsCardDeals.length === 0 ? showLoad() : bestGraphicsCardDeals}
        </div>
        <div className='deal-category'>
            <h1>TODAYS BEST AUDIO DEALS</h1>
            <a href="/audio?page=1">show all audio deals</a>
        </div>
        <div className="deals-grid">
          {bestAudioDeals.length === 0 ? showLoad() : bestAudioDeals}
        </div>
    </div>
  )
}

export default Home