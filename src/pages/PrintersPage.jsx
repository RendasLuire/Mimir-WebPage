import AddButton from "../Components/AddButton"
import InputSearch from "../Components/InputSearch"
import PrintersTable from "../Components/PrintersComponents/PrintersTable"
import printers from "../mocks/printers.json"

const PrintersPage = () => {
  return (
    <>
      <div className="container mt-3 ">
        <div className="row">
          <div className="col-sm-6 mb-3 ">
            <InputSearch />
          </div>
          <div className="col-md-auto">
            <AddButton title={"Printer"}/>
          </div>
        </div>
      </div>
      <PrintersTable data={printers}/>
    </>
  )
}

export default PrintersPage
