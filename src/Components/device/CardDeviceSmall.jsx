import DevicesIcon from "@mui/icons-material/Devices";
import LocalPrintshopOutlinedIcon from "@mui/icons-material/LocalPrintshopOutlined";
import MonitorOutlinedIcon from "@mui/icons-material/MonitorOutlined";
import ComputerOutlinedIcon from "@mui/icons-material/ComputerOutlined";
import TabletIcon from "@mui/icons-material/Tablet";
import DeviceUnknownIcon from "@mui/icons-material/DeviceUnknown";

const CardDeviceSmall = ({ device, onClick, isSelected }) => {
  const deviceIconMap = {
    desktop: <DevicesIcon sx={{ width: 50, height: 50 }} />,
    impresora: <LocalPrintshopOutlinedIcon sx={{ width: 50, height: 50 }} />,
    monitor: <MonitorOutlinedIcon sx={{ width: 50, height: 50 }} />,
    laptop: <ComputerOutlinedIcon sx={{ width: 50, height: 50 }} />,
    tablet: <TabletIcon sx={{ width: 50, height: 50 }} />,
    accesorio: <DeviceUnknownIcon sx={{ width: 50, height: 50 }} />,
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
            <h5 className="card-title">{device.hostname}</h5>
            <p className="card-text">{device.brand + " " + device.model}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDeviceSmall;
