import ButtonAddAnnexed from "../Components/AnnexedsComponents/ButtonAddAnnexed"
import AnnexedsTable from "../Components/AnnexedsComponents/AnnexedsTable"
import InputSearch from "../Components/InputSearch"
import Annexed from "../mocks/annexeds.json"

const AnnexedsPage = () => {
  return (
    <>
      <div className="container mt-3 ">
        <div className="row">
          <div className="col-sm-6 mb-3 ">
            <InputSearch />
          </div>
          <div className="col-md-auto">
            <ButtonAddAnnexed />
          </div>
        </div>
      </div>
      <AnnexedsTable data={Annexed} />
    </>
  )
}

export default AnnexedsPage
