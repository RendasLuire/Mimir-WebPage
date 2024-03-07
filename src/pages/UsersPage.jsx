import { useEffect, useState } from "react"

const UsersPage = () => {

  const [users, setUsers] = useState([])

  const fetchUsers = async() => {

    setUsers(data)
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <h1>Users Page</h1>
  )
}

export default UsersPage
