import { Route, Routes, Link, NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from "axios";

import DealsGrid from "../components/deals/DealsGrid"
import '../sass/Pagination.scss'

function Deals({ category }) {

  const [categoryDeals, setCategoryDeals] = useState([])

  useEffect(() => {     
    axios.get(`/api/deals?category=${category}&page=1&limit=500`, {headers: {'Content-Type': 'application/json'}})
        .then(res => res.data)
        .then(data => {
          setCategoryDeals(data)
        })
        .catch(err => console.log(err))
  }, [])
  
  return (
    <div>
      <Routes>
        <Route path="page=1" element={<DealsGrid data={categoryDeals} />} />
      </Routes>
      <nav className="pagination-container">
        
      </nav>
    </div>
  )
}

export default Deals