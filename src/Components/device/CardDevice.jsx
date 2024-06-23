import ComputerOutlinedIcon from "@mui/icons-material/ComputerOutlined";
import LocalPrintshopOutlinedIcon from "@mui/icons-material/LocalPrintshopOutlined";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import MonitorOutlinedIcon from "@mui/icons-material/MonitorOutlined";
import { Link } from "react-router-dom";

const CardDevice = ({ device }) => {
  const { _id, hostname, model, person, brand, status, typeDevice } = device;

  const deviceIconMap = {
    computer: <ComputerOutlinedIcon sx={{ width: 100, height: 100 }} />,
    printer: <LocalPrintshopOutlinedIcon sx={{ width: 100, height: 100 }} />,
    monitor: <MonitorOutlinedIcon sx={{ width: 100, height: 100 }} />,
  };

  const deviceColorMap = {
    available: "success",
    assigned: "secondary",
    replacement_requested: "primary",
    lost: "disabled",
    broken: "disabled",
    under_repair: "disabled",
  };

  const defaultColor = "disabled";

  const icon = deviceIconMap[typeDevice] || null;
  const color = deviceColorMap[status] || defaultColor;

  return (
    <>
      <Link
        to={`/inventory/devices/details/${_id}`}
        className="card w-100 glass m-1 d-flex flex-column align-items-center justify-content-center position-relative text-decoration-none"
      >
        <div className="glass m-2">{icon}</div>
        <div className="position-absolute top-0 start-0">
          <CircleOutlinedIcon color={color} />
        </div>
        <div className="card-body text-center">
          <h5 className="card-title">{hostname}</h5>
          <p className="card-text">{`${brand} ${model}`}</p>
          <p className="card-text">{`${device.serialNumber.toUpperCase()}`}</p>
          <p className="card-text">{`${
            person.name ? person.name : "Sin asignar"
          }`}</p>
        </div>
      </Link>
    </>
  );
};

export default CardDevice;
