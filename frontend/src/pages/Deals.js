import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import DealsGrid from "../components/DealsGrid"
import Paginated from '../components/Paginated';
import SearchFilter from '../components/SearchFilter';
import '../sass/Deals.scss'


function Deals({ category }) {

  let nav = useNavigate()
  let [searchParams, setSearchParams] = useSearchParams()
  const [categoryDeals, setCategoryDeals] = useState([])  
  const [totalPages, setTotalPages] = useState()

  useEffect(() => {     
    axios.get(`/api/deals?category=${category}&page=${searchParams.get('page')}&limit=16`, {headers: {'Content-Type': 'application/json'}})
        .then(res => res.data)
        .then(data => {
          setCategoryDeals(data)
          setTotalPages(data.totalPages)
        })
        .catch(err => console.log(err))
  }, [searchParams])

  function handlePageChange(page){
    if(page.target.textContent === 'prev' && searchParams.get('page') !== 1){
      setSearchParams({page: parseInt(searchParams.get('page')) - 1})
      window.location.reload(false);
    }
    else if(page.target.textContent === 'next' && searchParams.get('page') !== totalPages){
      setSearchParams({page: parseInt(searchParams.get('page')) + 1})
      window.location.reload(false);
    }
    else{
      setSearchParams({page: page.target.textContent})
      window.location.reload(false);
    }

  }
  
  return (
    <main className='deals-container'>
      <SearchFilter />
      <DealsGrid data={categoryDeals.deals}/>
      <Paginated totalPages={totalPages} currentPage={parseInt(searchParams.get('page'))} handlePageChange={handlePageChange} />
    </main>
  )
}

export default Deals