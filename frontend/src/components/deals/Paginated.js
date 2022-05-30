import '../../sass/Pagination.scss'

function Paginated({ totalPages, currentPage, handlePageChange }) {
  return (
    <nav className="pagination-container"  >
        
        {currentPage <= 5 &&
            <>
                <button onClick={(event)=> handlePageChange(event)}>1</button>
                <button onClick={(event)=> handlePageChange(event)}>2</button>
                <button onClick={(event)=> handlePageChange(event)}>3</button>
                <button onClick={(event)=> handlePageChange(event)}>4</button>
                <button onClick={(event)=> handlePageChange(event)}>5</button>
                <button>...</button>
                <button onClick={(event)=> handlePageChange(event)}>{totalPages}</button>
                <button id='next' onClick={(event)=> handlePageChange(event)}>next</button>
            </>
        }
        {currentPage > 5 && currentPage < totalPages - 2 &&
            <>
                <button id='prev' onClick={(event)=> handlePageChange(event)}>prev</button>
                <button id='prev' onClick={(event)=> handlePageChange(event)}>1</button>
                <button>...</button>
                <button onClick={(event)=> handlePageChange(event)}>{currentPage - 2}</button>
                <button onClick={(event)=> handlePageChange(event)}>{currentPage - 1}</button>
                <button onClick={(event)=> handlePageChange(event)}>{currentPage}</button>
                <button onClick={(event)=> handlePageChange(event)}>{currentPage + 1}</button>
                <button onClick={(event)=> handlePageChange(event)}>{currentPage + 2}</button>
                <button>...</button>
                <button onClick={(event)=> handlePageChange(event)}>{totalPages}</button>
                <button id='next' onClick={(event)=> handlePageChange(event)}>next</button>
            </>
         }
        {currentPage > totalPages - 3 &&
            <>
                <button id='prev' onClick={(event)=> handlePageChange(event)}>prev</button>
                <button id='prev' onClick={(event)=> handlePageChange(event)}>1</button>
                <button>...</button>
                <button onClick={(event)=> handlePageChange(event)}>{totalPages - 3}</button>
                <button onClick={(event)=> handlePageChange(event)}>{totalPages - 2}</button>
                <button onClick={(event)=> handlePageChange(event)}>{totalPages - 1}</button>
                <button onClick={(event)=> handlePageChange(event)}>{totalPages}</button>
            </>
         }
        
      </nav>
  )
}

export default Paginated