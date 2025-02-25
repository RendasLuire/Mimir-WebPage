import PropTypes from "prop-types";
import LocalPrintshopOutlinedIcon from "@mui/icons-material/LocalPrintshopOutlined";
import MonitorOutlinedIcon from "@mui/icons-material/MonitorOutlined";
import DevicesIcon from "@mui/icons-material/Devices";
import TabletIcon from "@mui/icons-material/Tablet";
import DeviceUnknownIcon from "@mui/icons-material/DeviceUnknown";
import CircleIcon from "@mui/icons-material/Circle";
import ComputerOutlinedIcon from "@mui/icons-material/ComputerOutlined";
import moment from "moment";
import { Link } from "react-router-dom";
import { Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import "./DeviceCard.css";
import { API } from "../../../utils/Urls";

const DeviceCard = ({ device }) => {
  const [loading, setLoading] = useState(true);
  const [listSettings, setListSettings] = useState([]);

  const getStatus = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return false;
      }

      const request = await fetch(`${API.base}settings/statusDevice`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      if (!request.ok) {
        if (request.status === 404) {
          console.warn("Endpoint not found (404)");
        } else {
          console.error(`API error: ${request.status}`);
        }
        return;
      }
      setLoading(false);

      const response = await request.json();
      const { data } = response;
      setListSettings(data);
    } catch (error) {
      console.log("Error: " + error);
    }
  };

  useEffect(() => {
    getStatus();
  }, [device]);

  const getColorAndLabel = (statusValue) => {
    const status = listSettings.find((item) => item.value === statusValue);
    return status
      ? { color: status.option, label: status.label }
      : { color: "#F44336", label: "Desconocido" };
  };

  const { color, label } = getColorAndLabel(device.status.value);

  const deviceIconMap = {
    desktop: <DevicesIcon sx={{ width: 100, height: 100 }} />,
    impresora: <LocalPrintshopOutlinedIcon sx={{ width: 100, height: 100 }} />,
    monitor: <MonitorOutlinedIcon sx={{ width: 100, height: 100 }} />,
    laptop: <ComputerOutlinedIcon sx={{ width: 100, height: 100 }} />,
    tablet: <TabletIcon sx={{ width: 100, height: 100 }} />,
    accesorio: <DeviceUnknownIcon sx={{ width: 100, height: 100 }} />,
  };

  const icon = deviceIconMap[device.typeDevice] || null;

  return (
    <Link to={`/inventory/devices/${device._id}`} className="device-card ">
      <div className="card m-1 d-flex flex-column align-items-center justify-content-center position-relative text-decoration-none">
        <div className="mx-2 icon">{icon}</div>
        <div className="position-absolute top-0 start-0">
          {loading ? (
            <Tooltip title={"loading"} arrow>
              <CircleIcon sx={{ color: "grey" }} />
            </Tooltip>
          ) : (
            <Tooltip title={label} arrow>
              <CircleIcon sx={{ color }} />
            </Tooltip>
          )}
        </div>
        <div className="position-absolute top-0 end-0 icon">
          {device.monitor?.id && (
            <Tooltip title={device.monitor?.serialNumber.toUpperCase()}>
              <MonitorOutlinedIcon />
            </Tooltip>
          )}
        </div>
        <div className="card-body text-center">
          <h5 className="card-title">{device.hostname.toUpperCase()}</h5>
          <p className="card-text">{`${device.brand} ${device.model}`}</p>
          <p className="card-text">{device.serialNumber.toUpperCase()}</p>
          <p className="card-text">
            {device.person.name && device.person.name !== "unassigned"
              ? device.person.name
              : "Sin asignar"}
          </p>
          <p className="card-text">
            <small className="text-body-secondary">
              {moment(device.lastChange).format("LL")}
            </small>
          </p>
        </div>
      </div>
    </Link>
  );
};

DeviceCard.propTypes = {
  device: PropTypes.object.isRequired,
};

export default DeviceCard;
