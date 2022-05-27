import { useState, useEffect } from 'react'
import axios from "axios";

import DealsGrid from "../components/deals/DealsGrid"
import '../sass/Pagination.scss'

function Deals({ category }) {

  const [categoryDeals, setCategoryDeals] = useState([])
  const [page, setPage] = useState(1)

  useEffect(() => {     
    axios.get(`/api/deals?category=${category}&page=${page}&limit=8`, {headers: {'Content-Type': 'application/json'}})
        .then(res => res.data)
        .then(data => {
          setCategoryDeals(data)
        })
        .catch(err => console.log(err))
  }, [page])

  function changePage(){

  }
  
  return (
    <div>
      <DealsGrid data={categoryDeals} />
      <nav className="pagination-container">
        <button onClick={()=>setPage(cur => cur === 1 ? 1 : cur - 1)}>prev</button>
        <h2>{`page ${page}`}</h2>
        <button onClick={()=>setPage(cur => cur === 10 ? 10 : cur + 1)}>next</button>
      </nav>
    </div>
  )
}

export default Deals