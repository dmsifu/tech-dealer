import '../sass/DealsGrid.scss'
import DealCard from './DealCard'
import LoadingCard from './LoadingCard'

function DealsGrid({ data }) {

  return (
    <div className='deals-grid-container'>
        <div className="deals-grid">
            {data === undefined ? [...new Array(16)].map((e,i)=> <LoadingCard key={i}/>): data.map((deal)=> 
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
          )}
        </div>
    </div>
  )
}

export default DealsGrid