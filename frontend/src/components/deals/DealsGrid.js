import { useEffect, useState } from 'react'
import DealCard from './DealCard'
import '../../sass/DealsGrid.scss'
import axios from 'axios'

function DealsGrid() {
    const [data, setData] = useState([])
    const [deals, setDeals] = useState([])

    useEffect(() => {      
        axios.get('/api/deals/', {headers: {'Content-Type': 'application/json'}})
            .then(res => res.data)
            .then(data => {
                setData(createDealCard(data))
            })
            .catch(err => console.log(err))
      
    }, [])



    function createDealCard(data){

        setDeals(
            Object.keys(data).map((seller)=>{
                if(seller === '_id' || seller === '__v'){return}
                else{
                    return Object.keys(data[seller]).map((category)=>( 
                        Object.values(data[seller][category]).map((deal)=>(
                            <DealCard 
                                key={deal._id} 
                                title={deal.title} 
                                offerPrice={deal.offerPrice} 
                                originalPrice={deal.originalPrice} 
                                productLink={deal.productLink} 
                                productImageLink={deal.productImageLink} 
                            />
                        ))
                    ))
                }
            })   
        )
    }
    
    

  return (
    <div className='deals-grid-container'>
        <h1></h1>
        <div className="deals-grid">
            {deals}
        </div>
    </div>
  )
}

export default DealsGrid