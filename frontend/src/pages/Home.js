import '../sass/DealsGrid.scss'

function Home({ data, filterData, sortByBestPercentOff}) {
  function showDeals(dealArray){
    if(dealArray.length === 0){return}
    const dealsShown = []
    for (let i = 0; i < 8; i++) {
        dealsShown.push(dealArray[i])
    }
    return dealsShown
  }

  return (
    <div className='deals-grid-container'>
        <div className='deal-category'>
            <h1>TODAYS BEST TV DEALS</h1>
            <a href="/tvs/page=1">show all tv deals</a>
        </div>
        <div className="deals-grid">
            {data.length === 0 ? <h1>Loading Deals..</h1> : showDeals(filterData(data.tvs, sortByBestPercentOff))}
        </div>
        <div className='deal-category'>
            <h1>TODAYS BEST LAPTOP DEALS</h1>
            <a href="/laptops/page=1">show all laptop deals</a>
        </div>
        <div className="deals-grid">
          {data.length === 0 ? <h1>Loading Deals..</h1> : showDeals(filterData(data.laptops, sortByBestPercentOff))}
        </div>
        <div className='deal-category'>
            <h1>TODAYS BEST GRAPHICS CARD DEALS</h1>
            <a href="/graphicscards/page=1">show all graphics card deals</a>
        </div>
        <div className="deals-grid">
          {data.length === 0 ? <h1>Loading Deals..</h1> : showDeals(filterData(data.graphicsCards, sortByBestPercentOff))}
        </div>
        <div className='deal-category'>
            <h1>TODAYS BEST AUDIO DEALS</h1>
            <a href="/audio/page=1">show all audio deals</a>
        </div>
        <div className="deals-grid">
          {data.length === 0 ? <h1>Loading Deals..</h1> : showDeals(filterData(data.audio, sortByBestPercentOff))}
        </div>
    </div>
  )
}

export default Home