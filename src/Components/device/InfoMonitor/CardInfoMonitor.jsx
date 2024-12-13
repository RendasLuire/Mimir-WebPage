import MonitorIcon from "@mui/icons-material/Monitor";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import "./CardInfoMonitor.css";
import { Tooltip } from "@mui/material";

const cardInfoMonitor = () => {
  return (
    <div className="container-info-monitor card">
      <div className="icon card-img-top card-header">
        <MonitorIcon sx={{ width: 100, height: 100 }} />
      </div>
      <div className="info card-body">
        <p>
          <label>Dummy</label>
          <span>Modelo</span>
        </p>
        <p>
          <label>Dummy</label>
          <span>Numero de serie</span>
        </p>
      </div>
      <div
        className="btn-group card-footer"
        role="group"
        aria-label="Grupo de acciones"
      >
        <button type="button" className="btn btn-secondary">
          <Tooltip title="Cambiar Monitor" placement="top">
            <ChangeCircleIcon />
          </Tooltip>
        </button>
      </div>
    </div>
  );
};

export default cardInfoMonitor;