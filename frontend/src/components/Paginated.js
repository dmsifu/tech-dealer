import '../sass/Pagination.scss'

function Paginated({ totalPages, currentPage, handlePageChange }) {
    
    function createButtons(array){
        return array.map((e,i) => <button key={`${e}${i}`} onClick={handlePageChange} style={e === currentPage ? {backgroundColor: 'rgb(21, 26, 36)', color: '#fff'} : {}} >{e}</button>)
    }
    
    function createPagination(totalPages, currentPage){
        if(totalPages <= 6){
            return createButtons(Array.from({length: totalPages}, (_, i) => i + 1))
        }
        else if(currentPage <=5 && totalPages > 5){
            return createButtons([1,2,3,4,5,'...',totalPages, 'next'])
        }
        else if(currentPage >= totalPages - 4 ){
            return createButtons(['prev', 1, '...', totalPages - 4,totalPages - 3, totalPages - 2, totalPages - 1, totalPages])
        }
        else{
            return createButtons(['prev', 1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages, 'next'])
        }
    }

  return (
    <nav className="pagination-container"  >
        { createPagination(totalPages, currentPage)} 
      </nav>
  )
}

export default Paginated