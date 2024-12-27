import DevicesIcon from "@mui/icons-material/Devices";
import ComputerOutlinedIcon from "@mui/icons-material/ComputerOutlined";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import PrintIcon from "@mui/icons-material/Print";
import EditIcon from "@mui/icons-material/Edit";
import "./CardInfoDevice.css";
import { Tooltip } from "@mui/material";
import useDevice from "../../../hooks/useDevice";
import Global from "../../../helpers/Global";
import { useEffect, useState } from "react";

const CardInfoDevice = () => {
  const { deviceData } = useDevice({});
  const [infoValidation, setInfoValidation] = useState(false);
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

  const checkInfo = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token || !deviceData._id) {
        throw new Error("No se encontró el token de autenticación.");
      }

      const request = await fetch(
        `${Global.url}reports-v2/checkInfo/${deviceData._id}`,
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
      console.log(error);
    }
  };

  const handleCreateResponsive = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token || !deviceData._id) {
        throw new Error("No se encontró el token de autenticación.");
      }

      let link;
      if (
        deviceData.typeDevice == "desktop" ||
        deviceData.typeDevice == "laptop"
      ) {
        link = `${Global.url}reports-v2/responsivepc/${deviceData._id}`;
      } else {
        link = `${Global.url}reports-v2/responsivePrint/${deviceData._id}`;
      }

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
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (deviceData._id) {
      checkInfo();
    }
  }, [deviceData]);

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
        <button
          type="button"
          className="btn btn-primary"
          disabled={!infoValidation}
        >
          <Tooltip
            title="Imprimir Responsiva"
            placement="top"
            onClick={handleCreateResponsive}
          >
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
