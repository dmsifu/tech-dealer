import '../../sass/DealsGrid.scss'

function DealsGrid({ data, filterData, sortByBestPercentOff }) {

  return (
    <div className='deals-grid-container'>
        <div className="deals-grid">
            {!data ? <h1>Loading Deals..</h1> : filterData(data, sortByBestPercentOff)}
        </div>
    </div>
  )
}

export default DealsGrid