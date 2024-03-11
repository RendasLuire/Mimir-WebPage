import AddButton from "../Components/AddButton"
import AnnexedsTable from "../Components/AnnxedsComponents/AnnexedsTable"
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
            <AddButton title={"Annexed"}/>
          </div>
        </div>
      </div>
      <AnnexedsTable data={Annexed} />
    </>
  )
}

export default AnnexedsPage
