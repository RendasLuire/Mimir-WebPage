import usersData from "../mocks/users.json"
import UsersTable from "../Components/UsersComponents/UsersTable"
import AddButton from "../Components/AddButton"
import InputSearch from "../Components/InputSearch"

const UsersPage = () => {

  return (
    <>
    <div className="container">
    <div className="container mt-3 ">
        <div className="row">
          <div className="col-sm-6 mb-3 ">
            <InputSearch />
          </div>
          <div className="col-md-auto">
            <AddButton title={"User"}/>
          </div>
        </div>
      </div>
      <UsersTable data = { usersData } />
    </div>
    </>
  )
}

export default UsersPage
