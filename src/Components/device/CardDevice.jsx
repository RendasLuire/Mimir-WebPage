import ComputerOutlinedIcon from "@mui/icons-material/ComputerOutlined";
import LocalPrintshopOutlinedIcon from "@mui/icons-material/LocalPrintshopOutlined";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import MonitorOutlinedIcon from "@mui/icons-material/MonitorOutlined";
import { Link } from "react-router-dom";

const CardDevice = ({ device }) => {
  const { _id, hostname, model, user, brand, status, type } = device;

  const deviceIconMap = {
    Computadora: <ComputerOutlinedIcon sx={{ width: 150, height: 150 }} />,
    Impresora: <LocalPrintshopOutlinedIcon sx={{ width: 150, height: 150 }} />,
    Monitor: <MonitorOutlinedIcon sx={{ width: 150, height: 150 }} />,
  };

  const deviceColorMap = {
    Activo: "success",
    Guardado: "secondary",
  };

  const icon = deviceIconMap[type] || null;
  const color = deviceColorMap[status] || null;

  return (
    <>
      <Link
        to={`/inventory/devices/details/${_id}`}
        className="card w-100 glass m-1 d-flex flex-column align-items-center justify-content-center position-relative"
      >
        <div className="glass m-2">{icon}</div>
        <div className="position-absolute top-0 start-0">
          <CircleOutlinedIcon color={color} />
        </div>
        <div className="card-body text-center">
          <h5 className="card-title">{hostname}</h5>
          <p className="card-text">{`${brand} ${model}`}</p>
          <p className="card-text">{`${device.serialNumber}`}</p>
          <p className="card-text">{`User: ${user.name}`}</p>
        </div>
      </Link>
    </>
  );
};

export default CardDevice;
