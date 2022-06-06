import { Routes, Route } from 'react-router-dom'
import TopContainer from "./components/TopContainer";
import Home from "./pages/Home";
import Deals from './pages/Deals';

function App() {
  return (
    <div className="app">
      <TopContainer/>
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="/tvs/*" element={<Deals category="tvs"/>} />
        <Route path="/laptops/*" element={<Deals category="laptops"/>} />
        <Route path="/graphicscards/*" element={<Deals category="graphicsCards" />} />
        <Route path="/audio/*" element={<Deals category="audio"/>} />
      </Routes>
    </div>
  );
}

export default App;
