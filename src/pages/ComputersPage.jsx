import ButtonAddComputer from "../Components/ComputersComponents/ButtonAddComputer"
import ComputersTable from "../Components/ComputersComponents/ComputersTable"
import InputSearch from "../Components/InputSearch"
import computers from "../mocks/computers.json"

const ComputersPage = () => {
  return (
    <>
      <div className="container mt-3 ">
        <div className="row">
          <div className="col-sm-6 mb-3 ">
            <InputSearch />
          </div>
          <div className="col-md-auto">
            <ButtonAddComputer />
          </div>
        </div>
      </div>
      <ComputersTable data = {computers}/>
    </>
  )
}

export default ComputersPage
