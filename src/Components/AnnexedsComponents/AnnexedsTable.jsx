import { useEffect, useState } from "react"
import Avatar from '@mui/material/Avatar';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import CardItemList from "../CardItemList"

const AnnexedsTable = ({data}) => {

    const [annexedsData, SetAnnexedsData] = useState([])

    const fetchAnnexeds = () => {
        SetAnnexedsData(data)
    }

    useEffect(() => {
        fetchAnnexeds()
    },[])

  return (

    <div className="container">
        <h1>Annexeds List</h1>
        <div>
            {
                annexedsData ?
                annexedsData.map(annexed =>
                    <CardItemList 
                    key={annexed.Id} 
                    imagen={<Avatar sx={{ width: 100, height: 100 }}><InsertDriveFileOutlinedIcon sx={{ fontSize: 80 }}/> </Avatar>}
                    title={annexed.Name}
                    />
                )
                :
                <h2>No hay informacion</h2>
            }
        </div>
    </div>
  )
}

export default AnnexedsTable
