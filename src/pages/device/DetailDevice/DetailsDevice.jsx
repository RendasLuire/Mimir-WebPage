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
    <div className="container">
      {loading ? (
        <div className="d-flex justify-content-center">
          <CircularProgress />
        </div>
      ) : (
        <div className="grid-container">
          <div className="grid-item device">
            <CardInfoDevice />
          </div>
          <div className="grid-item monitor">
            <CardInfoMonitor />
          </div>
          <div className="grid-item user">
            <CardInfoUser />
          </div>
          <div className="grid-item network">
            <CardInfoNetwork />
          </div>
          <div className="grid-item office">
            <CardInfoOffice />
          </div>
          <div className="grid-item extras">
            <CardInfoExtras />
          </div>
          <div className="grid-item comments">
            <CardChatComments />
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailsDevice;
