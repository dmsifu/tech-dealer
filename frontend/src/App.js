import { Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import TopContainer from "./components/modal/TopContainer";
import DealCard from './components/deals/DealCard'
import Home from "./pages/Home";
import axios from "axios";
import Deals from './pages/Deals';

function App() {
  const [data, setData] = useState([])

  useEffect(() => {     
    axios.get('/api/deals/', {headers: {'Content-Type': 'application/json'}})
        .then(res => res.data)
        .then(data => {
          setData(data)
        })
        .catch(err => console.log(err))
  
  }, [])

  function filterData(deals, filterFunction){
    const filteredDeals = filterFunction(deals)
    return filteredDeals.map((deal)=> 
            <DealCard 
              key={deal._id} 
              title={deal.title} 
              offerPrice={deal.offerPrice} 
              originalPrice={deal.originalPrice} 
              percentOff={deal.percentOff}
              productLink={deal.productLink} 
              productImageLink={deal.productImageLink} 
            />
          )
  }

  function sortByBestPercentOff(deal){
    return deal.sort((a,b)=> parseInt(b['percentOff'].match(/[\d]+/g).join('')) - parseInt(a['percentOff'].match(/[\d]+/g).join('')))
  }

  return (
    <div className="app">
      <TopContainer/>
      <Routes>
        <Route path="/" element={<Home data={data} filterData={filterData} sortByBestPercentOff={sortByBestPercentOff} />} />
        <Route path="/tvs/*" element={<Deals data={data.tvs} filterData={filterData} sortByBestPercentOff={sortByBestPercentOff} />} />
        <Route path="/laptops/*" element={<Deals data={data.laptops} filterData={filterData} sortByBestPercentOff={sortByBestPercentOff} />} />
        <Route path="/graphicscards/*" element={<Deals data={data.graphicsCards} filterData={filterData} sortByBestPercentOff={sortByBestPercentOff} />} />
        <Route path="/audio/*" element={<Deals data={data.audio} filterData={filterData} sortByBestPercentOff={sortByBestPercentOff} />} />
      </Routes>
    </div>
  );
}

export default App;
