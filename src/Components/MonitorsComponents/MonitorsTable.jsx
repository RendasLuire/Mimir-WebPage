import { useEffect, useState } from "react"
import Avatar from '@mui/material/Avatar';
import DesktopWindowsOutlinedIcon from '@mui/icons-material/DesktopWindowsOutlined';
import CardItemList from "../CardItemList"

const MonitorsTable = ({data}) => {

    const [monitorData, setMonitorData] = useState([])

    const fetchMonitor = () => {
        setMonitorData(data)
    }

    useEffect(() => {
        fetchMonitor()
    },[])

  return (
    <div className="container">
      <h1>Monitors Table</h1>
      <div>
        {monitorData
        ?
        monitorData.map(monitor =>
                <CardItemList  
                key={monitor.Id} 
                imagen={<Avatar sx={{ width: 100, height: 100 }}><DesktopWindowsOutlinedIcon sx={{ fontSize: 80 }}/> </Avatar>}
                title={monitor.Brand} 
                paragraph1a={monitor.Model} 
                paragraph1b={monitor.SerialNumber}
                />
            )
        :
        <h2>No hay Informacion</h2>
        }
      </div>
    </div>
  )
}

export default MonitorsTable
