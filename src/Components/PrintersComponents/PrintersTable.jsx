import { useEffect, useState } from "react"
import Avatar from '@mui/material/Avatar';
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import CardItemList from "../CardItemList"

const PrintersTable = ({data}) => {

    const [printersData, setPrintersData] = useState([])

    const fetchMonitors = () => {
        setPrintersData(data)
    }

    useEffect(() => {
        fetchMonitors()
    },[])

  return (
    <div className="container">
      <h1>Printers Table</h1>
      {
        printersData
        ?
        printersData.map(printer =>
            <CardItemList 
            key={printer.Id} 
            imagen={<Avatar sx={{ width: 100, height: 100 }}><PrintOutlinedIcon sx={{ fontSize: 80 }}/> </Avatar>}
            title={printer.Brand}
            />
            )
        :
        <h2>No hay informacion</h2>
      }
    </div>
  )
}

export default PrintersTable
