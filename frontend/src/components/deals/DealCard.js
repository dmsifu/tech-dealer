
function DealCard({ title, offerPrice, originalPrice, productLink, productImageLink }) {
  return (
    <div className="deal-card">
      <a href={productLink}>
        <img src={productImageLink} alt={`Image for ${title}`} />
        <h1 className="title">{title}</h1>
        <h1 className="offer-price">{offerPrice}</h1>
        <h1 className="original-price">{originalPrice}</h1>
      </a>
    </div>
  )
}

export default DealCard