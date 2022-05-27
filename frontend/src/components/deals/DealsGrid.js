import '../../sass/DealsGrid.scss'
import DealCard from './DealCard'

function DealsGrid({ data }) {

  return (
    <div className='deals-grid-container'>
        <div className="deals-grid">
            {data.length === 0 ? <h1>Loading Deals..</h1> : data.map((deal)=> 
              <DealCard 
                key={deal._id} 
                title={deal.title} 
                offerPrice={deal.offerPrice} 
                originalPrice={deal.originalPrice} 
                percentOff={deal.percentOff}
                productLink={deal.productLink} 
                productImageLink={deal.productImageLink} 
              />
          )}
        </div>
    </div>
  )
}

export default DealsGrid