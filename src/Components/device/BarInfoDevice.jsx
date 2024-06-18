import useDevice from "../../hooks/useDevice";
import ComputerOutlinedIcon from "@mui/icons-material/ComputerOutlined";
import MonitorOutlinedIcon from "@mui/icons-material/MonitorOutlined";
import LocalPrintshopOutlinedIcon from "@mui/icons-material/LocalPrintshopOutlined";
import PrintIcon from "@mui/icons-material/Print";

import { useEffect, useState } from "react";
import Global from "../../helpers/Global";
import StatusInfoCard from "./StatusInfoCard";
import UbicationCard from "./UbicationCard";
import PersonAssingCard from "./PersonAssingCard";
import EditInfoCard from "./EditInfoCard";

const BarInfoDevice = () => {
  const { deviceData } = useDevice({});
  const [validationResponsive, setvalidationResponsive] = useState({
    data: false,
  });
  const iconMap = {
    computer: <ComputerOutlinedIcon sx={{ width: 100, height: 100 }} />,
    printer: <LocalPrintshopOutlinedIcon sx={{ width: 100, height: 100 }} />,
    monitor: <MonitorOutlinedIcon sx={{ width: 100, height: 100 }} />,
  };
  const typeDevice = deviceData.typeDevice;
  const icon = iconMap[typeDevice] || null;

  const validation = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token || !deviceData._id) {
        throw new Error("No se encontró el token de autenticación.");
      }

      const request = await fetch(
        Global.url + "reports/validationInfo/" + deviceData._id,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      const response = await request.json();
      setvalidationResponsive(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (deviceData._id) {
      validation();
    }
  }, [deviceData]);

  return (
    <div className="glass card">
      <div className="row g-0">
        <div className="col-md-1 m-1 text-center">
          <div className="img-fluid rounded-start">{icon}</div>
        </div>
        <div className="col m-1">
          <div className="card-body">
            <h5 className="card-title">{deviceData.hostname}</h5>
            <p className="card-text">
              {deviceData.brand + " " + deviceData.model}
            </p>
          </div>
        </div>
        <div className="col m-1 py-3 ">
          <StatusInfoCard />
        </div>
        <div className="col m-1 py-3">
          <UbicationCard />
        </div>
        <div className="col m-1 py-3">
          <PersonAssingCard />
        </div>
        <div className="col m-1 py-3">
          <div className="card-body glass d-flex justify-content-between align-items-center">
            <div className="d-flex flex-column px-2">
              <label className="card-title">
                {validationResponsive.data.toString()}
              </label>
              <p className="card-text">
                <small className="text-body-secondary">responsive</small>
              </p>
            </div>
            <button className="btn" disabled={!validationResponsive.data}>
              <PrintIcon />
            </button>
          </div>
        </div>
        <div className="col m-1 py-3">
          <EditInfoCard />
        </div>
      </div>
    </div>
  );
};

export default BarInfoDevice;
