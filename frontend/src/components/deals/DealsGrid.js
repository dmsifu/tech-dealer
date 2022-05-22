import { useEffect, useState } from 'react'
import DealCard from './DealCard'
import '../../sass/DealsGrid.scss'
import axios from 'axios'

function DealsGrid() {
    const [data, setData] = useState([])
    const [tvDeals, setTvDeals] = useState([])
    const [laptopDeals, setLaptopDeals] = useState([])
    const [graphicsCardDeals, setGraphicsCardDeals] = useState([])
    const [audioDeals, setAudio] = useState([])

    useEffect(() => {      
        axios.get('/api/deals/', {headers: {'Content-Type': 'application/json'}})
            .then(res => res.data)
            .then(data => {
                setData(createDealCards(data))
            })
            .catch(err => console.log(err))
      
    }, [])


    function createDealCards(data){
        const bestTvDeals = data.tvs.sort((a,b)=> parseInt(b['percentOff'].match(/[\d]+/g).join('')) - parseInt(a['percentOff'].match(/[\d]+/g).join('')))
        const bestGraphicsCardDeals = data.graphicsCards.sort((a,b)=> parseInt(b['percentOff'].match(/[\d]+/g).join('')) - parseInt(a['percentOff'].match(/[\d]+/g).join('')))
        const bestlaptopDeals = data.laptops.sort((a,b)=> parseInt(b['percentOff'].match(/[\d]+/g).join('')) - parseInt(a['percentOff'].match(/[\d]+/g).join('')))
        const bestAudioDeals = data.audio.sort((a,b)=> parseInt(b['percentOff'].match(/[\d]+/g).join('')) - parseInt(a['percentOff'].match(/[\d]+/g).join('')))

        setTvDeals(
            bestTvDeals.map((deal, i)=>{
                if(i >= 12 ){return}
                return <DealCard 
                    key={deal._id} 
                    title={deal.title} 
                    offerPrice={deal.offerPrice} 
                    originalPrice={deal.originalPrice} 
                    percentOff={deal.percentOff}
                    productLink={deal.productLink} 
                    productImageLink={deal.productImageLink} 
                />
            })
        )
        setLaptopDeals(
            bestlaptopDeals.map((deal, i)=>{
                if(i >= 12 ){return}
                return <DealCard 
                    key={deal._id} 
                    title={deal.title} 
                    offerPrice={deal.offerPrice} 
                    originalPrice={deal.originalPrice} 
                    percentOff={deal.percentOff}
                    productLink={deal.productLink} 
                    productImageLink={deal.productImageLink} 
                />
            })
        )
        setGraphicsCardDeals(
            bestGraphicsCardDeals.map((deal, i)=>{
                if(i >= 12 ){return}
                return <DealCard 
                    key={deal._id} 
                    title={deal.title} 
                    offerPrice={deal.offerPrice} 
                    originalPrice={deal.originalPrice} 
                    percentOff={deal.percentOff}
                    productLink={deal.productLink} 
                    productImageLink={deal.productImageLink} 
                />
            })
        )
        setAudio(
            bestAudioDeals.map((deal, i)=>{
                if(i >= 12 ){return}
                return <DealCard 
                    key={deal._id} 
                    title={deal.title} 
                    offerPrice={deal.offerPrice} 
                    originalPrice={deal.originalPrice} 
                    percentOff={deal.percentOff}
                    productLink={deal.productLink} 
                    productImageLink={deal.productImageLink} 
                />
            })
        )
    }
    
    

  return (
    <div className='deals-grid-container'>
        <h1>Todays Tv Deals!</h1>
        <div className="deals-grid">
            {tvDeals}
        </div>
        <h1>Todays Laptop Deals!</h1>
        <div className="deals-grid">
            {laptopDeals}
        </div>
        <h1>Todays GraphicsCard Deals Deals!</h1>
        <div className="deals-grid">
            {graphicsCardDeals}
        </div>
        <h1>Todays Audio Deals!</h1>
        <div className="deals-grid">
            {audioDeals}
        </div>
        
    </div>
  )
}

export default DealsGrid