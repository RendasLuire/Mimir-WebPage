import DevicesIcon from "@mui/icons-material/Devices";
import ComputerOutlinedIcon from "@mui/icons-material/ComputerOutlined";
import PrintIcon from "@mui/icons-material/Print";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import EditIcon from "@mui/icons-material/Edit";
import { Tooltip } from "@mui/material";
import "./DetailsDeviceCard.css";
import PropTypes from "prop-types";

const iconMap = {
  desktop: <DevicesIcon sx={{ width: 50, height: 50 }} />,
  laptop: <ComputerOutlinedIcon sx={{ width: 50, height: 50 }} />,
};

const FrontCard = ({
  deviceData,
  setIsFlipped,
  setOpen,
  setMessage,
  setUpdate,
}) => {
  const icon = iconMap[deviceData.typeDevice] || null;
  return (
    <div className="detaisDeviceCard front-card">
      <div className="card">
        <div className="card-header">
          <h1>{icon}</h1>
        </div>
        <div className="card-body info">
          <p>
            <label>{`${deviceData.brand} ${deviceData.model}`}</label>
            <span>Modelo</span>
          </p>
          <p>
            <label>{deviceData.serialNumber?.toUpperCase()}</label>
            <span>Número de serie</span>
          </p>
          <p>
            <label>{deviceData.hostname}</label>
            <span>Hostname</span>
          </p>
          <p>
            <label>{deviceData.phisicRef}</label>
            <span>Ubicación física</span>
          </p>
          <p>
            <label>{deviceData.annexed?.number}</label>
            <span>Anexo</span>
          </p>
        </div>
        <div className="card-footer">
          <div className="btn-group">
            <button type="button" className="btn btn-primary">
              <Tooltip title="Editar" placement="top">
                <EditIcon />
              </Tooltip>
            </button>
            <button type="button" className="btn btn-primary">
              <Tooltip title="Imprimir Responsiva" placement="top">
                <PrintIcon />
              </Tooltip>
            </button>
            <button type="button" className="btn btn-primary">
              <Tooltip title="Cambiar equipo" placement="top">
                <ChangeCircleIcon />
              </Tooltip>
            </button>
            <button type="button" className="btn btn-primary">
              <Tooltip title="Copiar información" placement="top">
                <ContentCopyIcon />
              </Tooltip>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

FrontCard.propTypes = {
  deviceData: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  setIsFlipped: PropTypes.func.isRequired,
  setOpen: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
  setUpdate: PropTypes.func.isRequired,
};
export default FrontCard;
