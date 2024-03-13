import InputSearch from "../Components/InputSearch"
import ButtonAddMonitor from "../Components/MonitorsComponents/ButtonAddMonitor"
import MonitorsTable from "../Components/MonitorsComponents/MonitorsTable"
import monitors from "../mocks/monitors.json"

const MonitorsPage = () => {
  return (
    <div className="container">
      <div className="container mt-3 ">
        <div className="row">
          <div className="col-sm-6 mb-3 ">
            <InputSearch />
          </div>
          <div className="col-md-auto">
            <ButtonAddMonitor />
          </div>
        </div>
      </div>
      <MonitorsTable data={monitors}/>
    </div>
  )
}

export default MonitorsPage
