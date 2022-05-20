
function DealCard({ title, offerPrice, originalPrice, productLink, productImageLink }) {
  return (
    <div className="deal-card">
      <a href={productLink}>
        <div className="deal-image">
          <img src={productImageLink} alt={`Image for ${title}`} />
        </div>
        <div className="title-container">
          <h1 className="title">{title}</h1>
        </div>
        <div className="price-container">
          <h1 className="offer-price">{offerPrice}</h1>
          <h1 className="original-price">{originalPrice}</h1>
        </div>
      </a>
    </div>
  )
}

export default DealCard