/* import usersData from "../mocks/users.json" */
import UsersTable from "../Components/UsersComponents/UsersTable"
import InputSearch from "../Components/InputSearch"
import ButtonAddUser from "../Components/UsersComponents/ButtonAddUser"
import { useEffect, useState } from "react"
import Global from "../helpers/Global"

const UsersPage = () => {

  const [usersData, setUsersData] =  useState([])

  const fetchUsers = async () => {
    const response = await fetch(Global.url + "persons", {
      method: "GET",
      headers: { 'Content-Type': 'application/json' }
    })
    const data = await response.json()
    console.log(data)
    setUsersData(data)
  }

  useEffect(() => {
    fetchUsers()
  },[])

  return (
    <>
    <div className="container">
    <div className="container mt-3 ">
        <div className="row">
          <div className="col-sm-6 mb-3 ">
            <InputSearch />
          </div>
          <div className="col-md-auto">
            <ButtonAddUser />
          </div>
        </div>
      </div>
      <UsersTable data = { usersData } />
    </div>
    </>
  )
}

export default UsersPage
