import useDevice from "../../hooks/useDevice";
import ComputerOutlinedIcon from "@mui/icons-material/ComputerOutlined";
import MonitorOutlinedIcon from "@mui/icons-material/MonitorOutlined";
import LocalPrintshopOutlinedIcon from "@mui/icons-material/LocalPrintshopOutlined";

import { useEffect } from "react";
import StatusInfoCard from "./StatusInfoCard";
import UbicationCard from "./UbicationCard";
import PersonAssingCard from "./PersonAssingCard";
import EditInfoCard from "./EditInfoCard";
import PrintResponsiveCard from "./PrintResponsiveCard";

const BarInfoDevice = () => {
  const { deviceData } = useDevice({});

  const iconMap = {
    computer: <ComputerOutlinedIcon sx={{ width: 100, height: 100 }} />,
    printer: <LocalPrintshopOutlinedIcon sx={{ width: 100, height: 100 }} />,
    monitor: <MonitorOutlinedIcon sx={{ width: 100, height: 100 }} />,
  };
  const typeDevice = deviceData.typeDevice;
  const icon = iconMap[typeDevice] || null;

  useEffect(() => {}, [deviceData]);

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
          <PrintResponsiveCard />
        </div>
        <div className="col m-1 py-3">
          <EditInfoCard />
        </div>
      </div>
    </div>
  );
};

export default BarInfoDevice;
