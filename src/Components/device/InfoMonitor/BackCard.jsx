import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import { Pagination } from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import TextField from "@mui/material/TextField";
import MonitorIcon from "@mui/icons-material/Monitor";
import "./CardInfoMonitor.css";
import Global from "../../../helpers/Global";
import { useEffect, useState } from "react";

const BackCard = ({
  monitorData,
  setFlipped,
  setMessage,
  setOpen,
  setUpdate,
  device,
  user,
}) => {
  const [listMonitors, setListMonitors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const devicesPerPage = 3;

  const getMonitors = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return false;
      }

      const request = await fetch(
        `${
          Global.url
        }device?typeDevice=Monitor&page=${currentPage}&limit=${devicesPerPage}&status=${"en_resguardo"}&typeDevice=${"monitor"}&search=${search}`,
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

  const handleSelectClick = async (monitor) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return false;
      }

      const messageUpdateComputer = {
        monitorId: monitor._id,
        user: user.id ? user.id : "",
      };

      const requestComputer = await fetch(
        Global.url + "device/assingMonitor/" + device,
        {
          method: "PATCH",
          body: JSON.stringify(messageUpdateComputer),
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      await requestComputer.json();

      setUpdate(true);
      setFlipped(false);
    } catch (error) {
      setMessage("Error" + error);
      setOpen(true);
    }
  };

  const handleUnnasingClick = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return false;
      }

      const request = await fetch(
        `${Global.url}device/unassingMonitor/${device}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      await request.json();

      setUpdate(true);
      setFlipped(false);
    } catch (error) {
      setMessage("Error" + error);
      setOpen(true);
    }
  };

  const handleInputChange = (event) => {
    setSearch(event.target.value);
  };

  const handleCancelClick = () => {
    setFlipped(false);
  };

  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    getMonitors();
  }, [monitorData, currentPage]);

  return (
    <div className="card">
      <div className="card-header">
        <ListItem disablePadding>
          <ListItemButton onDoubleClick={handleUnnasingClick}>
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
        <TextField
          id="filled-search"
          label="Buscar usuario"
          type="search"
          variant="filled"
          value={search}
          onChange={handleInputChange}
        />
        <div className="d-flex justify-content-center">
          <Pagination
            count={totalPages}
            page={currentPage}
            variant="outlined"
            color="primary"
            onChange={handleChangePage}
          />
        </div>
        <List>
          {listMonitors.map((monitor) => (
            <ListItem disablePadding key={monitor._id}>
              <ListItemButton onClick={() => handleSelectClick(monitor)}>
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
