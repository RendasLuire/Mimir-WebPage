import ComputersTable from "../Components/ComputersComponents/ComputersTable"
import computers from "../mocks/computers.json"

const ComputersPage = () => {
  return (
    <>
      <ComputersTable data = {computers}/>
    </>
  )
}

export default ComputersPage
