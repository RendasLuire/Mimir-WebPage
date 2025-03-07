import DevicesIcon from "@mui/icons-material/Devices";
import ComputerOutlinedIcon from "@mui/icons-material/ComputerOutlined";
import PrintIcon from "@mui/icons-material/Print";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import EditIcon from "@mui/icons-material/Edit";
import { Tooltip } from "@mui/material";
import "./DetailsDeviceCard.css";
import PropTypes from "prop-types";
import { API } from "../../../utils/Urls";
import { useEffect, useState } from "react";

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
  const [infoValidation, setInfoValidation] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const copyToClipboard = () => {
    const deviceInfo = `
      Marca: ${deviceData.brand} ${deviceData.model}
      Número de Serie: ${deviceData.serialNumber.toUpperCase()}
      Hostname: ${deviceData.hostname}
      Anexo: ${deviceData.annexed?.number}
      Ubicacion Fisica: ${deviceData.phisicRef}
      -------------------------------------
      Monitor
      Marca: ${deviceData.monitor?.id?.brand} ${deviceData.monitor?.id?.model}
      Número de Serie: ${deviceData.monitor?.serialNumber.toUpperCase()}
      -------------------------------------
      Usuario
      Nombre: ${deviceData.person?.name}
      Departamento: ${deviceData.person?.id?.department?.name}
      -------------------------------------
      Red
      Ip: ${deviceData.network?.ip}
      Mac WIFI: ${deviceData.network?.macWifi}
      Mac Ethernet: ${deviceData.network?.macEthernet}
      -------------------------------------
      Office
      Version: ${deviceData.office?.officeVersion}
      Key: ${deviceData.office?.officeKey}
    `;

    navigator.clipboard.writeText(deviceInfo).catch((err) => {
      console.error("Error al copiar al portapapeles: ", err);
      setMessage("Error al copiar al portapapeles.");
      setOpen(true);
    });
    setMessage("Se ha copiado la información al portapapeles.");
    setOpen(true);
  };

  const handleCreateResponsive = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token || !deviceData._id)
        throw new Error("No se encontró el token de autenticación.");

      const link = `${API.base}reports-v2/responsive${
        deviceData.typeDevice === "desktop" ||
        deviceData.typeDevice === "laptop"
          ? "pc"
          : "Print"
      }/${deviceData._id}`;

      const request = await fetch(link, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      const blob = await request.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      const fileName = `${deviceData.serialNumber} - ${deviceData.person.name}.pdf`;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      setMessage("Se ha generado la responsiva correctamente.");
      setOpen(true);
    } catch (error) {
      setMessage("Error", error);
      setOpen(true);
    }
  };

  const checkInfo = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token || !deviceData._id)
        throw new Error("No se encontró el token de autenticación.");

      const request = await fetch(
        `${API.base}reports-v2/checkInfo/${deviceData._id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      const response = await request.json();
      setInfoValidation(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (deviceData._id) checkInfo();
  }, []);

  const handleEditClick = () => setIsFlipped(true);

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
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleEditClick}
            >
              <Tooltip title="Editar" placement="top">
                <EditIcon />
              </Tooltip>
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleCreateResponsive}
            >
              <Tooltip title="Imprimir Responsiva" placement="top">
                <PrintIcon />
              </Tooltip>
            </button>
            <button type="button" className="btn btn-primary">
              <Tooltip title="Cambiar equipo" placement="top">
                <ChangeCircleIcon />
              </Tooltip>
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={copyToClipboard}
            >
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
