import { useState, useEffect } from 'react'
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import DealsGrid from "../components/DealsGrid"
import Paginated from '../components/Paginated';
import SearchFilter from '../components/SearchFilter';
import '../sass/Deals.scss'

function Deals({ category }) {

  let [searchParams, setSearchParams] = useSearchParams()
  const [categoryDeals, setCategoryDeals] = useState([])  
  const [totalPages, setTotalPages] = useState()

  useEffect(() => {     
    axios.get(`/api/deals?category=${category}&page=${searchParams.get('page')}&limit=16&search=${searchParams.get('search')}&filter=${searchParams.get('filter')}`)
      .then(res => res.data)
      .then(data => {
        setCategoryDeals(data)
        setTotalPages(data.totalPages)
      })
      .catch(err => console.log(err))
  }, [searchParams])

  function handlePageChange(page){
    if(page.target.textContent === 'prev' && searchParams.get('page') !== 1){
      if(searchParams.get('search') === null && searchParams.get('filter') === null){
        setSearchParams({page: parseInt(searchParams.get('page')) - 1})
      }
      else if(searchParams.get('search') !== null && searchParams.get('filter') === null){
        setSearchParams({page: parseInt(searchParams.get('page')) - 1, search: searchParams.get('search')})
      }
      else if(searchParams.get('search') === null && searchParams.get('filter') !== null){
        setSearchParams({page: parseInt(searchParams.get('page')) - 1, filter: searchParams.get('filter')})
      }
      else{
        setSearchParams({page: parseInt(searchParams.get('page')) - 1, search: searchParams.get('search'), filter: searchParams.get('filter') })
      }
      window.location.reload(false)
    }
    else if(page.target.textContent === 'next' && searchParams.get('page') !== totalPages){
      if(searchParams.get('search') === null && searchParams.get('filter') === null){
        setSearchParams({page: parseInt(searchParams.get('page')) + 1})
      }
      else if(searchParams.get('search') !== null && searchParams.get('filter') === null){
        setSearchParams({page: parseInt(searchParams.get('page')) + 1, search: searchParams.get('search')})
      }
      else if(searchParams.get('search') === null && searchParams.get('filter') !== null){
        setSearchParams({page: parseInt(searchParams.get('page')) + 1, filter: searchParams.get('filter')})
      }
      else{
        setSearchParams({page: parseInt(searchParams.get('page')) + 1, search: searchParams.get('search'), filter: searchParams.get('filter') })
      }
      window.location.reload(false)
    }
    else if (page.target.textContent !== '...'){
      if(searchParams.get('search') === null && searchParams.get('filter') === null){
        setSearchParams({page: page.target.textContent})
      }
      else if(searchParams.get('search') !== null && searchParams.get('filter') === null){
        setSearchParams({page: page.target.textContent, search: searchParams.get('search')})
      }
      else if(searchParams.get('search') === null && searchParams.get('filter') !== null){
        setSearchParams({page: page.target.textContent, filter: searchParams.get('filter')})
      }
      else{
        setSearchParams({page: page.target.textContent, search: searchParams.get('search'), filter: searchParams.get('filter') })
      }
      window.location.reload(false)
    }
  }
  
  return (
    <main className='deals-container'>
      <SearchFilter setSearchParams={setSearchParams} currentSearch={searchParams.get('search')}/>
      <DealsGrid data={categoryDeals.deals}/>
      <Paginated totalPages={totalPages} currentPage={parseInt(searchParams.get('page'))} handlePageChange={handlePageChange} />
    </main>
  )
}

export default Deals