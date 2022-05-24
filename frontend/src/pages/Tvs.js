import DealsGrid from "../components/deals/DealsGrid"

function Tvs({data, filterData, sortByBestPercentOff}) {
  return (
    <div>
        <DealsGrid data={data} filterData={filterData} sortByBestPercentOff={sortByBestPercentOff} />
    </div>
  )
}

export default Tvs