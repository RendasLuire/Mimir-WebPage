import React from "react";
import DevicesIcon from "@mui/icons-material/Devices";
import LocalPrintshopOutlinedIcon from "@mui/icons-material/LocalPrintshopOutlined";
import MonitorOutlinedIcon from "@mui/icons-material/MonitorOutlined";
import ComputerOutlinedIcon from "@mui/icons-material/ComputerOutlined";
import TabletIcon from "@mui/icons-material/Tablet";
import DeviceUnknownIcon from "@mui/icons-material/DeviceUnknown";
import "./SmallDeviceCard.css";

const SmallDeviceCard = ({ device, onClick, isSelected }) => {
  const deviceIconMap = {
    desktop: <DevicesIcon sx={{ width: 25, height: 25 }} />,
    impresora: <LocalPrintshopOutlinedIcon sx={{ width: 25, height: 25 }} />,
    monitor: <MonitorOutlinedIcon sx={{ width: 25, height: 25 }} />,
    laptop: <ComputerOutlinedIcon sx={{ width: 25, height: 25 }} />,
    tablet: <TabletIcon sx={{ width: 25, height: 25 }} />,
    accesorio: <DeviceUnknownIcon sx={{ width: 25, height: 25 }} />,
  };

  const icon = deviceIconMap[device.typeDevice] || null;

  return (
    <div
      className={`card ${isSelected ? "selected-card" : ""}`}
      onClick={onClick}
    >
      <div className="row">
        <div className="col-lg-2 align-items-center align-self-center">
          <div className="m-2 ">{icon}</div>
        </div>
        <div className="col">
          <div className="card-body">
            <h5 className="card-title">{device.serialNumber}</h5>
            <p className="card-text">{device.brand + " " + device.model}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmallDeviceCard;
