import '../../sass/Pagination.scss'

function Paginated({ totalPages, currentPage, handlePageChange }) {
  return (
    <nav className="pagination-container"  >
        <button id='prev' onClick={(event)=> handlePageChange(event)}>prev</button>
        {currentPage <= 3 &&
            <>
                <button onClick={(event)=> handlePageChange(event)}>1</button>
                <button onClick={(event)=> handlePageChange(event)}>2</button>
                <button onClick={(event)=> handlePageChange(event)}>3</button>
                <button>...</button>
            </>
        }
        {currentPage > 3 && currentPage < totalPages &&
            <>
                <button>...</button>
                <button onClick={(event)=> handlePageChange(event)}>{currentPage - 1}</button>
                <button onClick={(event)=> handlePageChange(event)}>{currentPage}</button>
                <button onClick={(event)=> handlePageChange(event)}>{currentPage + 1}</button>
                <button>...</button>
            </>
         }
        <button onClick={(event)=> handlePageChange(event)}>{totalPages}</button>
        <button id='next' onClick={(event)=> handlePageChange(event)}>next</button>
      </nav>
  )
}

export default Paginated