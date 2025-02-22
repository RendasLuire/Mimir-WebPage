import { useEffect } from "react";
import CardChatComments from "../../../Components/device/ChatComments/CardChatComments";
import CardInfoDevice from "../../../Components/device/InfoDevice/CardInfoDevice";
import CardInfoExtras from "../../../Components/device/InfoExtras/CardInfoExtras";
import CardInfoMonitor from "../../../Components/device/InfoMonitor/CardInfoMonitor";
import CardInfoNetwork from "../../../Components/device/InfoNetwork/CardInfoNetwork";
import CardInfoOffice from "../../../Components/device/InfoOffice/CardInfoOffice";
import CardInfoUser from "../../../Components/device/InfoUser/CardInfoUser";
import "./DetailsDevices.css";
import { useParams } from "react-router-dom";
import useDevice from "../../../hooks/useDevice";
import { CircularProgress } from "@mui/material";

const DetailsDevice = () => {
  const { id } = useParams();
  const { setDeviceData, loading } = useDevice({});

  useEffect(() => {
    setDeviceData({ _id: id });
  }, [id, setDeviceData]);

  return (
    <div className="details-device-container">
      {loading ? (
        <div className="details-device-loading d-flex justify-content-center">
          <CircularProgress />
        </div>
      ) : (
        <div className="details-device-grid-container">
          <div
            className="details-device-grid-item details-device-device"
            style={{ gridArea: "device" }}
          >
            <CardInfoDevice />
          </div>
          <div
            className="details-device-grid-item details-device-monitor"
            style={{ gridArea: "monitor" }}
          >
            <CardInfoMonitor />
          </div>
          <div
            className="details-device-grid-item details-device-user"
            style={{ gridArea: "user" }}
          >
            <CardInfoUser />
          </div>
          <div
            className="details-device-grid-item details-device-network"
            style={{ gridArea: "network" }}
          >
            <CardInfoNetwork />
          </div>
          <div
            className="details-device-grid-item details-device-office"
            style={{ gridArea: "office" }}
          >
            <CardInfoOffice />
          </div>
          <div
            className="details-device-grid-item details-device-extras"
            style={{ gridArea: "extras" }}
          >
            <CardInfoExtras />
          </div>
          <div
            className="details-device-grid-item details-device-comments"
            style={{ gridArea: "comments" }}
          >
            <CardChatComments />
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailsDevice;
