import { useEffect, useState } from "react"
import Avatar from '@mui/material/Avatar';
import PortraitOutlinedIcon from '@mui/icons-material/PortraitOutlined';
import CardItemList from "../CardItemList";

const UsersTable = ({data}) => {

    const [usersData, setUsers] = useState([])

    const fetchUsers = () => {
        setUsers(data)
    }

    useEffect(() => {
        fetchUsers()
    }, [])
    return (
        <div className="container">
            <h1>Users List</h1>
            <div>
                {usersData ? 
                usersData.map(user => 
                        <CardItemList 
                        key={user.Id} 
                        imagen={<Avatar sx={{ width: 100, height: 100 }}><PortraitOutlinedIcon sx={{ fontSize: 80 }} /></Avatar>} 
                        title={user.Name} 
                        paragraph1a={user.Position} 
                        paragraph1b={user.Department}
                        />
                    )
                :
                <h2>No hay datos</h2>
                }
            </div>
        </div>
    )
}

export default UsersTable
