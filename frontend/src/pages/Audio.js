import DealsGrid from "../components/deals/DealsGrid"

function Audio({data, filterData, sortByBestPercentOff}) {
  return (
    <div>
      <DealsGrid data={data} filterData={filterData} sortByBestPercentOff={sortByBestPercentOff} />
    </div>
  )
}

export default Audio