import ComputerOutlinedIcon from "@mui/icons-material/ComputerOutlined";
import LocalPrintshopOutlinedIcon from "@mui/icons-material/LocalPrintshopOutlined";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import MonitorOutlinedIcon from "@mui/icons-material/MonitorOutlined";
import { Link } from "react-router-dom";

const CardDevice = ({ device }) => {
  const { _id, hostname, model, person, brand, status, typeDevice } = device;

  const deviceIconMap = {
    computer: <ComputerOutlinedIcon sx={{ width: 150, height: 150 }} />,
    printer: <LocalPrintshopOutlinedIcon sx={{ width: 150, height: 150 }} />,
    monitor: <MonitorOutlinedIcon sx={{ width: 150, height: 150 }} />,
  };

  const deviceColorMap = {
    available: "success",
    Guardado: "secondary",
  };

  const icon = deviceIconMap[typeDevice] || null;
  const color = deviceColorMap[status] || null;

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
          <p className="card-text">{`${device.serialNumber}`}</p>
          <p className="card-text">{`User: ${person.name}`}</p>
        </div>
      </Link>
    </>
  );
};

export default CardDevice;
