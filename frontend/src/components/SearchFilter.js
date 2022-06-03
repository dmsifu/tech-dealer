import '../sass/SearchFilter.scss' 

function SearchFilter({ setSearchParams, currentSearch}) {

    function handleSearch(e){
        e.preventDefault()
        if(e.target.filter.value === 'highest percent off' && e.target.search.value === ''){
          setSearchParams({page: 1})
          window.location.reload(false)
        }
        else if(e.target.filter.value === 'highest percent off' && e.target.search.value !== ''){
          setSearchParams({page: 1, search: e.target.search.value})
          window.location.reload(false)
        }
        else if((e.target.filter.value === 'ascending' || e.target.filter.value === 'descending') && e.target.search.value === ''){
          setSearchParams({page: 1, filter: e.target.filter.value})
          window.location.reload(false)
        }
        else if((e.target.filter.value === 'ascending' || e.target.filter.value === 'descending') && e.target.search.value !== ''){
          setSearchParams({page: 1, search: e.target.search.value,filter: e.target.filter.value})
          window.location.reload(false)
        }
        
    }

  return (
    <form className="search-filter-container" onSubmit={handleSearch}>
        <label htmlFor="search">Search Deals</label>
        <input type="text" id="search" placeholder={currentSearch === null ? '' : currentSearch}/>
        <label htmlFor="filter">Filters</label>
        <select name="filters" id="filter">
            <option value="highest percent off">highest percent off</option>
            <option value="ascending">price ascending</option>
            <option value="descending">price descending</option>
        </select>
        <button type='submit'>Find</button>
    </form>
  )
}

export default SearchFilter