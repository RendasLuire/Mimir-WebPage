import ComputerOutlinedIcon from "@mui/icons-material/ComputerOutlined";
import LocalPrintshopOutlinedIcon from "@mui/icons-material/LocalPrintshopOutlined";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import MonitorOutlinedIcon from "@mui/icons-material/MonitorOutlined";
import { Link } from "react-router-dom";

const CardComputer = ({ computer }) => {
  const { _id, hostname, model, userName, brand, status, type } = computer;

  const iconMap = {
    computer: <ComputerOutlinedIcon sx={{ width: 150, height: 150 }} />,
    printer: <LocalPrintshopOutlinedIcon sx={{ width: 150, height: 150 }} />,
    monitor: <MonitorOutlinedIcon sx={{ width: 150, height: 150 }} />,
  };

  const colorMap = {
    available: "success",
    "in storage": "secondary",
  };

  const icon = iconMap[type] || null;
  const color = colorMap[status] || null;

  return (
    <>
      <Link
        to={`/inventory/computers/details/${_id}`}
        className="card w-100 glass m-1 d-flex flex-column align-items-center justify-content-center position-relative"
      >
        <div className="glass m-2">{icon}</div>
        <div className="position-absolute top-0 start-0">
          <CircleOutlinedIcon color={color} />
        </div>
        <div className="card-body text-center">
          <h5 className="card-title">{hostname}</h5>
          <p className="card-text">{`${brand} ${model}`}</p>
          <p className="card-text">{`User: ${userName}`}</p>
        </div>
      </Link>
    </>
  );
};

export default CardComputer;
