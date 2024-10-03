import PropTypes from "prop-types";
import ComputerOutlinedIcon from "@mui/icons-material/ComputerOutlined";
import LocalPrintshopOutlinedIcon from "@mui/icons-material/LocalPrintshopOutlined";
import CircleIcon from "@mui/icons-material/Circle";
import MonitorOutlinedIcon from "@mui/icons-material/MonitorOutlined";
import DevicesIcon from "@mui/icons-material/Devices";
import TabletIcon from "@mui/icons-material/Tablet";
import DeviceUnknownIcon from "@mui/icons-material/DeviceUnknown";
import moment from "moment";
import { capitalizeFirstLetterOfEachWord } from "../../helpers/Tools.js";
import { Link } from "react-router-dom";
import { Tooltip } from "@mui/material";

moment.locale("es-mx");

const CardDevice = ({ device }) => {
  const {
    _id,
    hostname,
    model,
    person,
    brand,
    status,
    typeDevice,
    monitor,
    serialNumber,
  } = device;

  const deviceIconMap = {
    desktop: <DevicesIcon sx={{ width: 100, height: 100 }} />,
    impresora: <LocalPrintshopOutlinedIcon sx={{ width: 100, height: 100 }} />,
    monitor: <MonitorOutlinedIcon sx={{ width: 100, height: 100 }} />,
    laptop: <ComputerOutlinedIcon sx={{ width: 100, height: 100 }} />,
    tablet: <TabletIcon sx={{ width: 100, height: 100 }} />,
    accesorio: <DeviceUnknownIcon sx={{ width: 100, height: 100 }} />,
  };

  const deviceColorMap = {
    disponible: { color: "green", label: "Disponible" },
    asignado: { color: "blue", label: "Asignado" },
    remplazo_requerido: { color: "orange", label: "Remplazo requerido" },
    perdido: { color: "grey", label: "Perdido" },
    descompuesto: { color: "red", label: "Descompuesto" },
    en_reparacion: { color: "yellow", label: "En reparación" },
  };

  const defaultConfig = { color: "grey", label: "Desconocido" };

  const icon = deviceIconMap[typeDevice] || null;
  const { color, label } = deviceColorMap[status.value] || defaultConfig;

  return (
    <Link
      to={`/inventory/devices/details/${_id}`}
      className="card device-card w-100 glass m-1 d-flex flex-column align-items-center justify-content-center position-relative text-decoration-none"
    >
      <div className="mx-2">{icon}</div>
      <div className="position-absolute top-0 start-0">
        <Tooltip title={label} arrow>
          <CircleIcon sx={{ color }} />
        </Tooltip>
      </div>
      <div className="position-absolute top-0 end-0">
        {monitor?.id && (
          <Tooltip title={monitor?.serialNumber.toUpperCase()}>
            <MonitorOutlinedIcon />
          </Tooltip>
        )}
      </div>
      <div className="card-body text-center">
        <h5 className="card-title">{hostname.toUpperCase()}</h5>
        <p className="card-text">
          {capitalizeFirstLetterOfEachWord(`${brand} ${model}`)}
        </p>
        <p className="card-text">{serialNumber.toUpperCase()}</p>
        <p className="card-text">
          {person.name && person.name !== "unassigned"
            ? capitalizeFirstLetterOfEachWord(person.name)
            : "Sin asignar"}
        </p>
        <p className="card-text">
          <small className="text-body-secondary">
            {moment(device.lastChange).format("LL")}
          </small>
        </p>
      </div>
    </Link>
  );
};

CardDevice.propTypes = {
  device: PropTypes.object.isRequired,
};

export default CardDevice;
