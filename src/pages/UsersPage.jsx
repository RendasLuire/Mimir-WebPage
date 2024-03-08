import usersData from "../mocks/users.json"
import UsersTable from "../Components/UsersComponents/UsersTable"
import InputSearch from "../Components/InputSearch"

const UsersPage = () => {

  return (
    <>
    <div className="container">
      <div className="container pt-3">
        <InputSearch className="col-md-2" />
        <button className="btn btn-primary col-md-1" type="submit">Button</button>
      </div>
      <UsersTable data = { usersData } />
    </div>
    </>
  )
}

export default UsersPage
