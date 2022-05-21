import { useEffect, useState } from 'react'
import DealCard from './DealCard'
import '../../sass/DealsGrid.scss'
import axios from 'axios'

function DealsGrid() {
    const [data, setData] = useState([])
    const [tvDeals, setTvDeals] = useState([])

    useEffect(() => {      
        axios.get('/api/deals/', {headers: {'Content-Type': 'application/json'}})
            .then(res => res.data)
            .then(data => {
                setData(createDealCards(data))
            })
            .catch(err => console.log(err))
      
    }, [])


    function createDealCards(data){

        setTvDeals(
            data.tvs.map((deal, i)=>{
                if(i >= 8 ){return}
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
    </div>
  )
}

export default DealsGrid