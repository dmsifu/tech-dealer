
function DealCard({ title, offerPrice, originalPrice, percentOff, productLink, productImageLink }) {
  return (
    <div className="deal-card">
      <a href={productLink}>
        <div className="deal-image">
          <img src={productImageLink} alt={`Image for ${title}`} />
        </div>
        <div className="title-container">
          <h2 className="title">{title}</h2>
        </div>
        <div className="price-container">
          <h2 className="offer-price">{offerPrice}</h2>
          <h2 className="original-price">{originalPrice}</h2>
          <h2 className="percent-off">{`${percentOff} Off`}</h2>
        </div>
      </a>
    </div>
  )
}

export default DealCard