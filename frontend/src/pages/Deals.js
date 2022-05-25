import DealsGrid from "../components/deals/DealsGrid"
import { Route, Routes } from 'react-router-dom'

function Deals({data, filterData, sortByBestPercentOff}) {
  
  return (
    <div>
      <Routes>
        <Route path="page=1" element={<DealsGrid data={data} filterData={filterData} sortByBestPercentOff={sortByBestPercentOff} />} />
      </Routes>
    </div>
  )
}

export default Deals