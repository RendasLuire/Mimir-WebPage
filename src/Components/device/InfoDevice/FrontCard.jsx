import React, { useEffect, useState } from "react";
import DevicesIcon from "@mui/icons-material/Devices";
import ComputerOutlinedIcon from "@mui/icons-material/ComputerOutlined";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import PrintIcon from "@mui/icons-material/Print";
import EditIcon from "@mui/icons-material/Edit";
import { Tooltip } from "@mui/material";
import Global from "../../../helpers/Global";

const iconMap = {
  desktop: <DevicesIcon sx={{ width: 50, height: 50 }} />,
  laptop: <ComputerOutlinedIcon sx={{ width: 50, height: 50 }} />,
};

const FrontCard = ({ deviceData, setIsFlipped, setOpen, setMessage }) => {
  const [infoValidation, setInfoValidation] = useState(false);

  const icon = iconMap[deviceData.typeDevice] || null;

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
      Departamento: ${deviceData.person?.id?.department?.name}
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

      const link = `${Global.url}reports-v2/responsive${
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
      console.error(error);
    }
  };

  useEffect(() => {
    if (deviceData._id) checkInfo();
  }, [deviceData]);

  const handleEditClick = () => setIsFlipped(true);

  return (
    <div className="container-deviceInfo card">
      <div className="icon card-img-top card-header">
        <h1>{icon}</h1>
      </div>
      <div className="info card-body">
        <p>
          <label>{`${deviceData.brand} ${deviceData.model}`}</label>
          <span>Modelo</span>
        </p>
        <p>
          <label>{deviceData.serialNumber}</label>
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
      <div
        className="btn-group card-footer"
        role="group"
        aria-label="actions buttons"
      >
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
          disabled={!infoValidation}
          onClick={handleCreateResponsive}
        >
          <Tooltip title="Imprimir Responsiva" placement="top">
            <PrintIcon />
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
  );
};

export default FrontCard;
