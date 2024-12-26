import DevicesIcon from "@mui/icons-material/Devices";
import ComputerOutlinedIcon from "@mui/icons-material/ComputerOutlined";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import PrintIcon from "@mui/icons-material/Print";
import EditIcon from "@mui/icons-material/Edit";
import "./CardInfoDevice.css";
import { Tooltip } from "@mui/material";
import useDevice from "../../../hooks/useDevice";

const CardInfoDevice = () => {
  const { deviceData } = useDevice({});
  const iconMap = {
    desktop: <DevicesIcon sx={{ width: 100, height: 100 }} />,
    laptop: <ComputerOutlinedIcon sx={{ width: 100, height: 100 }} />,
  };

  const icon = iconMap["desktop"] || null;

  const copyToClipboard = () => {
    const deviceInfo = `
      Marca: ${deviceData.brand} ${deviceData.model}
      Número de Serie: ${deviceData.serialNumber}
      Hostname: ${deviceData.hostname}
      Anexo: ${deviceData.annexed?.number}
      Ubicacion Fisica: ${deviceData.phisicRef}
      -------------------------------------
      Monitor
      Marca: ${deviceData.monitor?.id?.brand} ${deviceData.monitor?.id?.model}
      Número de Serie: ${deviceData.monitor?.serialNumber}
      -------------------------------------
      Usuario
      Nombre: ${deviceData.person?.name}
      departamento: ${deviceData.person?.id?.department?.name}
    `;

    navigator.clipboard.writeText(deviceInfo).catch((err) => {
      console.error("Error al copiar al portapapeles: ", err);
    });
  };

  console.log(deviceData);

  return (
    <div className="container-deviceInfo card">
      <div className="icon card-img-top card-header">
        <h1>{icon}</h1>
      </div>
      <div className="info card-body">
        <p>
          <label>{deviceData.brand + " " + deviceData.model}</label>
          <span>Modelo</span>
        </p>
        <p>
          <label>{deviceData.serialNumber}</label>
          <span>Numero de serie</span>
        </p>
        <p>
          <label>{deviceData.hostname}</label>
          <span>Hostname</span>
        </p>
        <p>
          <label>{deviceData.phisicRef}</label>
          <span>Ubicacion fisica</span>
        </p>
        <p>
          <label>{deviceData.annexed?.number}</label>
          <span>Anexo</span>
          <label>-</label>
          <span>Siguiente cambio</span>
        </p>
      </div>
      <div
        className="btn-group card-footer"
        role="group"
        aria-label="actions buttons"
      >
        <button type="button" className="btn btn-primary" disabled>
          <Tooltip title="Editar" placement="top">
            <EditIcon />
          </Tooltip>
        </button>
        <button type="button" className="btn btn-primary" disabled>
          <Tooltip title="Imprimir Responsiva" placement="top">
            <PrintIcon />
          </Tooltip>
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={copyToClipboard}
        >
          <Tooltip title="Copiar informacion" placement="top">
            <ContentCopyIcon />
          </Tooltip>
        </button>
      </div>
    </div>
  );
};

export default CardInfoDevice;
