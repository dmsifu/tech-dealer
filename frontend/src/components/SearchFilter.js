import '../sass/SearchFilter.scss' 

function SearchFilter() {
  return (
    <form className="search-filter-container">
        <label htmlFor="search">Search Deals</label>
        <input type="text" id="search" />
        <label htmlFor="filter">Filters</label>
        <select name="filters" id="filter">
            <option value="ascending">price ascending</option>
            <option value="ascending">price descending</option>
            <option value="ascending">highest percent off</option>
        </select>
    </form>
  )
}

export default SearchFilter