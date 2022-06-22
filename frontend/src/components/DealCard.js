import { motion, useAnimation } from 'framer-motion'

function DealCard({ title, offerPrice, originalPrice, percentOff, productLink, productImageLink, soldOn }) {

  const controls = useAnimation()

  function percentAnimation(test){
    if(test){
      controls.start({ 'boxShadow': '0px 5px 10px 0px rgba(38,113,243,0.9)' , y: 3, transition: { delay: .15 }})
    }
    else{
      controls.start({ 'boxShadow': '0px 5px 10px 0px rgba(38,113,243,0)', y: 0 })
    }
  }

  return (
    <motion.div 
      className="deal-card" 
      whileHover={{ y: 5 }} 
      onHoverStart={e => percentAnimation(true)} 
      onHoverEnd={e => percentAnimation(false)}
    >
      <a href={productLink}>
        <div className="deal-image">
          <img src={productImageLink} alt={title} />
        </div>
        <div className="title-container">
          <h2 className="title">{title}</h2>
        </div>
        <section>{`Sold on ${soldOn}`}</section>
        <div className="price-container">
          <h2 className="offer-price">{offerPrice}</h2>
          <h2 className="original-price">{originalPrice}</h2>
          <motion.h2 className="percent-off" animate={controls} >{`${percentOff} Off`}</motion.h2>
        </div>
      </a>
    </motion.div>
  )
}

export default DealCard