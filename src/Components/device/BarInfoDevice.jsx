import useDevice from "../../hooks/useDevice";
import ComputerOutlinedIcon from "@mui/icons-material/ComputerOutlined";
import MonitorOutlinedIcon from "@mui/icons-material/MonitorOutlined";
import LocalPrintshopOutlinedIcon from "@mui/icons-material/LocalPrintshopOutlined";
import DevicesIcon from "@mui/icons-material/Devices";
import TabletIcon from "@mui/icons-material/Tablet";
import DeviceUnknownIcon from "@mui/icons-material/DeviceUnknown";
import { capitalizeFirstLetterOfEachWord } from "../../helpers/Tools.js";

import { useEffect } from "react";
import StatusInfoCard from "./StatusInfoCard";
import UbicationCard from "./UbicationCard";
import PersonAssingCard from "./PersonAssingCard";
import PrintResponsiveCard from "./PrintResponsiveCard";
import MonitorInfoCard from "./MonitorInfoCard";
import EditDeviceInfoCard from "./EditDeviceInfoCard.jsx";

const BarInfoDevice = () => {
  const { deviceData } = useDevice({});

  const iconMap = {
    desktop: <DevicesIcon sx={{ width: 50, height: 50 }} />,
    impresora: <LocalPrintshopOutlinedIcon sx={{ width: 50, height: 50 }} />,
    monitor: <MonitorOutlinedIcon sx={{ width: 50, height: 50 }} />,
    laptop: <ComputerOutlinedIcon sx={{ width: 50, height: 50 }} />,
    tablet: <TabletIcon sx={{ width: 50, height: 50 }} />,
    accesorio: <DeviceUnknownIcon sx={{ width: 50, height: 50 }} />,
  };
  const typeDevice = deviceData.typeDevice;
  const icon = iconMap[typeDevice] || null;

  useEffect(() => {}, [deviceData]);

  return (
    <div className="glass card">
      <div className="row g-0 align-items-center">
        <div className="col-auto text-center m-3">
          <div className="img-fluid rounded-start">{icon}</div>
        </div>
        <div className="col-auto">
          <div className="card-body">
            <h5 className="card-title">{deviceData.hostname.toUpperCase()}</h5>
            <p className="card-text">{deviceData.serialNumber.toUpperCase()}</p>
            <p className="card-text">
              {capitalizeFirstLetterOfEachWord(deviceData.brand) +
                " " +
                capitalizeFirstLetterOfEachWord(deviceData.model)}
            </p>
          </div>
        </div>
        <div className="col-auto m-3">
          <PersonAssingCard />
        </div>
        <div className="col-auto m-3">
          <StatusInfoCard />
        </div>
        <div className="col-auto m-3">
          <UbicationCard />
        </div>
        {(deviceData.typeDevice == "desktop" ||
          deviceData.typeDevice == "laptop") && (
          <div className="col-auto m-3">
            <MonitorInfoCard />
          </div>
        )}
        <div className="col-auto m-3">
          <PrintResponsiveCard />
        </div>
        <div className="col-auto m-3">
          <EditDeviceInfoCard />
        </div>
      </div>
    </div>
  );
};

export default BarInfoDevice;
