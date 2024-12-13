import DevicesIcon from "@mui/icons-material/Devices";
import ComputerOutlinedIcon from "@mui/icons-material/ComputerOutlined";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import PrintIcon from "@mui/icons-material/Print";
import EditIcon from "@mui/icons-material/Edit";
import "./CardInfoDevice.css";
import { Tooltip } from "@mui/material";

const CardInfoDevice = () => {
  const iconMap = {
    desktop: <DevicesIcon sx={{ width: 100, height: 100 }} />,
    laptop: <ComputerOutlinedIcon sx={{ width: 100, height: 100 }} />,
  };

  const icon = iconMap["desktop"] || null;

  return (
    <div className="container-deviceInfo card">
      <div className="icon card-img-top card-header">
        <h1>{icon}</h1>
      </div>
      <div className="info card-body">
        <p>
          <label>Dummy</label>
          <span>Hostname</span>
        </p>
        <p>
          <label>Dummy</label>
          <span>Numero de serie</span>
        </p>
        <p>
          <label>Dummy</label>
          <span>Modelo</span>
        </p>
        <p>
          <label>Dummy</label>
          <span>Anexo</span>
        </p>
        <p>
          <label>Dummy</label>
          <span>Siguiente cambio</span>
        </p>
      </div>
      <div
        className="btn-group card-footer"
        role="group"
        aria-label="actions buttons"
      >
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
          <Tooltip title="Copiar informacion" placement="top">
            <ContentCopyIcon />
          </Tooltip>
        </button>
      </div>
    </div>
  );
};

export default CardInfoDevice;
