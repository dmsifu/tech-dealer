import { motion } from 'framer-motion'

function DealCard({ title, offerPrice, originalPrice, percentOff, productLink, productImageLink, soldOn }) {

  const DealCardVariants = {
    visible: {opacity: 1},
    hidden : {opacity: 0}
  }

  return (
    <motion.div className="deal-card">
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
          <h2 className="percent-off">{`${percentOff} Off`}</h2>
        </div>
      </a>
    </motion.div>
  )
}

export default DealCard