import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import DealsGrid from "../components/deals/DealsGrid"
import Paginated from '../components/deals/Paginated';

function Deals({ category }) {

  let nav = useNavigate()
  let [searchParams, setSearchParams] = useSearchParams()
  const [categoryDeals, setCategoryDeals] = useState([])  

  useEffect(() => {     
    axios.get(`/api/deals?category=${category}&page=${searchParams.get('page')}&limit=16`, {headers: {'Content-Type': 'application/json'}})
        .then(res => res.data)
        .then(data => {
          setCategoryDeals(data)
        })
        .catch(err => console.log(err))
  }, [searchParams])

  function handlePageChange(page){
    if(page.target.textContent === 'prev' && searchParams.get('page') !== '1'){
      setSearchParams({page: parseInt(searchParams.get('page')) - 1})
      window.location.reload(false);
    }
    else if(page.target.textContent === 'next'){
      setSearchParams({page: parseInt(searchParams.get('page')) + 1})
      window.location.reload(false);
    }
    else{
      setSearchParams({page: page.target.textContent})
      window.location.reload(false);
    }

  }
  
  return (
    <div>
      <DealsGrid data={categoryDeals.deals}/>
      <Paginated totalPage={categoryDeals.totalPages} currentPage={parseInt(searchParams.get('page'))} handlePageChange={handlePageChange} />
    </div>
  )
}

export default Deals