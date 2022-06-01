import '../sass/Pagination.scss'

function Paginated({ totalPages, currentPage, handlePageChange }) {

    function createPagination(totalPages){
        let test = []
        for (let i = 1; i <= totalPages; i++) {
            test.push(<button key={i} onClick={handlePageChange}>{i}</button>)
        }
        return test
    }

  return (
    <nav className="pagination-container"  >
        {
            createPagination(totalPages)
        } 
      </nav>
  )
}

export default Paginated