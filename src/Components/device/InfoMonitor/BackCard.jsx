import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import MonitorIcon from "@mui/icons-material/Monitor";
import "./CardInfoMonitor.css";
import Global from "../../../helpers/Global";
import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";

const BackCard = ({ monitorData, setFlipped }) => {
  const [listMonitors, setListMonitors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const devicesPerPage = 3;
  const { auth } = useAuth();

  const getMonitors = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return false;
      }

      const request = await fetch(
        `${Global.url}device?typeDevice=Monitor&page=${currentPage}&limit=${devicesPerPage}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      const response = await request.json();
      const { data, pagination } = response;

      const filteredMonitors = data.filter(
        (monitor) =>
          monitor.status.value == "en_resguardo" && monitor.person.name == ""
      );

      setListMonitors(filteredMonitors);
      setTotalPages(pagination.totalPages);
    } catch (error) {
      console.log("Error: " + error);
    }
  };

  const handleCancelClick = () => {
    setFlipped(false);
  };

  useEffect(() => {
    getMonitors();
  }, [monitorData, currentPage]);

  return (
    <div className="card">
      <div className="card-header">
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <MonitorIcon />
            </ListItemIcon>
            <ListItemText
              primary={
                monitorData?.brand
                  ? monitorData?.brand + " " + monitorData?.model
                  : "Modelo"
              }
              secondary={
                monitorData?.serialNumber
                  ? monitorData?.serialNumber?.toUpperCase()
                  : "Numero de serie"
              }
            />
          </ListItemButton>
        </ListItem>
      </div>
      <div className="card-body list-card-back">
        <List>
          {listMonitors.map((monitor) => (
            <ListItem disablePadding key={monitor._id}>
              <ListItemButton>
                <ListItemIcon>
                  <MonitorIcon />
                </ListItemIcon>
                <ListItemText
                  primary={monitor.brand + " " + monitor.model}
                  secondary={monitor.serialNumber.toUpperCase()}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </div>
      <div className="card-footer btn-group">
        <button className="btn btn-primary" type="button">
          Guardar
        </button>
        <button
          className="btn btn-danger"
          type="button"
          onClick={handleCancelClick}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default BackCard;
