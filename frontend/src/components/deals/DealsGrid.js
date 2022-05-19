import { useEffect, useState } from 'react'
import DealCard from './DealCard'
import '../../sass/DealsGrid.scss'
import d from './data'

function DealsGrid() {
    const [data, setData] = useState()
    const [deals, setDeals] = useState()

    useEffect(() => {
    //   async function fetchDeals(){
    //     try {
    //         const response = await fetch('/api/deals')
    //         const data = await response.json()
    //         setData(data)

    //     } catch (error) {
    //         console.log(error)
    //     }
    //   }

    //   fetchDeals()
    createDealCard()
    setData(d)
    
      
    }, [])

    function createDealCard(){

        setDeals(
            d.bestbuy.graphicsCards.map((deal)=>(
                <DealCard 
                    key={deal._id} 
                    title={deal.title} 
                    offerPrice={deal.offerPrice} 
                    originalPrice={deal.originalPrice} 
                    productLink={deal.productLink} 
                    productImageLink={deal.productImageLink} 
                />
        )))
    }
    
    

  return (
    <div className='deals-grid-container'>
        <div className="deals-grid">
            {deals}
        </div>
    </div>
  )
}

export default DealsGrid