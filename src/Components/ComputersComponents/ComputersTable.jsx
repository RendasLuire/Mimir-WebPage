import { useEffect, useState } from "react"
import Avatar from '@mui/material/Avatar';
import ComputerOutlinedIcon from '@mui/icons-material/ComputerOutlined';
import CardItemList from "../CardItemList"

const ComputersTable = ({data}) => {

    const [computerData, setComputerData] = useState([])

    const fetchComputers = () => {
        setComputerData(data)
    }

    useEffect(() => {
        fetchComputers()
    },[])

  return (
    <div>
        <h1>Computers Table</h1>
        <div>
            {computerData ?
                computerData.map(item =>
                <CardItemList 
                key={item.Id}
                imagen={<Avatar sx={{ width: 100, height: 100 }}><ComputerOutlinedIcon sx={{ fontSize: 80 }} /></Avatar>}
                title={item.Brand + " " + item.Model}
                paragraph1a={item.HostName + " - " + item.SerialNumber}
                paragraph1b={item.User}
                title2={"Monitor"}
                />
                )
            :
            <h2>No hay informacion</h2>
            }
        </div>
    </div>
  )
}

export default ComputersTable
