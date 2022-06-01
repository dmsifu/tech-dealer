import '../sass/SearchFilter.scss' 

function SearchFilter({ setSearchParams, setCurrentSearch}) {

    function handleSearch(e){
        e.preventDefault()
        setSearchParams({page: 1, search: e.target.search.value})
        window.location.reload(false)
    }

  return (
    <form className="search-filter-container" onSubmit={handleSearch}>
        <label htmlFor="search">Search Deals</label>
        <input type="text" id="search" />
        <label htmlFor="filter">Filters</label>
        <select name="filters" id="filter">
            <option value="none">none</option>
            <option value="highest percent off">highest percent off</option>
            <option value="ascending">price ascending</option>
            <option value="descending">price descending</option>
        </select>
        <button type='submit'>Find</button>
    </form>
  )
}

export default SearchFilter