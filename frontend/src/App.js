import DealsGrid from "./components/deals/DealsGrid";
import DealCard from './components/deals/DealCard'
import TopContainer from "./components/modal/TopContainer";
import { Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Home from "./pages/Home";
import Tvs from "./pages/Tvs";
import GraphicsCards from "./pages/GraphicsCards";
import Audio from "./pages/Audio";
import axios from "axios";

function App() {
  const [tvDeals, setTvDeals] = useState([])
  const [laptopDeals, setLaptopDeals] = useState([])
  const [graphicsCardDeals, setGraphicsCardDeals] = useState([])
  const [audioDeals, setAudio] = useState([])

  useEffect(() => {     
    axios.get('/api/deals/', {headers: {'Content-Type': 'application/json'}})
        .then(res => res.data)
        .then(data => {
          setInitialData(data)
        })
        .catch(err => console.log(err))
  
  }, [])

  function setInitialData(data){
    const bestTvDeals = data.tvs.sort((a,b)=> parseInt(b['percentOff'].match(/[\d]+/g).join('')) - parseInt(a['percentOff'].match(/[\d]+/g).join('')))
    const bestGraphicsCardDeals = data.graphicsCards.sort((a,b)=> parseInt(b['percentOff'].match(/[\d]+/g).join('')) - parseInt(a['percentOff'].match(/[\d]+/g).join('')))
    const bestlaptopDeals = data.laptops.sort((a,b)=> parseInt(b['percentOff'].match(/[\d]+/g).join('')) - parseInt(a['percentOff'].match(/[\d]+/g).join('')))
    const bestAudioDeals = data.audio.sort((a,b)=> parseInt(b['percentOff'].match(/[\d]+/g).join('')) - parseInt(a['percentOff'].match(/[\d]+/g).join('')))
  
    setTvDeals(
        bestTvDeals.map((deal)=>(
            <DealCard 
              key={deal._id} 
              title={deal.title} 
              offerPrice={deal.offerPrice} 
              originalPrice={deal.originalPrice} 
              percentOff={deal.percentOff}
              productLink={deal.productLink} 
              productImageLink={deal.productImageLink} 
            />
        ))
    )
    setLaptopDeals(
        bestlaptopDeals.map((deal)=>(
            <DealCard 
              key={deal._id} 
              title={deal.title} 
              offerPrice={deal.offerPrice} 
              originalPrice={deal.originalPrice} 
              percentOff={deal.percentOff}
              productLink={deal.productLink} 
              productImageLink={deal.productImageLink} 
            />
        ))
    )
    setGraphicsCardDeals(
        bestGraphicsCardDeals.map((deal)=>(
            <DealCard 
              key={deal._id} 
              title={deal.title} 
              offerPrice={deal.offerPrice} 
              originalPrice={deal.originalPrice} 
              percentOff={deal.percentOff}
              productLink={deal.productLink} 
              productImageLink={deal.productImageLink} 
            />
        ))
    )
    setAudio(
        bestAudioDeals.map((deal)=>(
            <DealCard 
                key={deal._id} 
                title={deal.title} 
                offerPrice={deal.offerPrice} 
                originalPrice={deal.originalPrice} 
                percentOff={deal.percentOff}
                productLink={deal.productLink} 
                productImageLink={deal.productImageLink} 
            />
        ))
      )
   }
  
  return (
    <div className="app">
      <TopContainer/>
      <Routes>
        <Route path="/" element={<Home tvDeals={tvDeals} laptopDeals={laptopDeals} graphicsCardDeals={graphicsCardDeals} audioDeals={audioDeals} />} />
        <Route path="/tvs" element={<Tvs />} />
        <Route path="/graphicscards" element={<GraphicsCards />} />
        <Route path="/audio" element={<Audio />} />
      </Routes>
    </div>
  );
}

export default App;
