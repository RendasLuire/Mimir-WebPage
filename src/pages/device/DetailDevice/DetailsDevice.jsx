import CardChatComments from "../../../Components/device/ChatComments/CardChatComments";
import CardInfoDevice from "../../../Components/device/InfoDevice/CardInfoDevice";
import CardInfoExtras from "../../../Components/device/InfoExtras/CardInfoExtras";
import CardInfoMonitor from "../../../Components/device/InfoMonitor/CardInfoMonitor";
import CardInfoNetwork from "../../../Components/device/InfoNetwork/CardInfoNetwork";
import CardInfoOffice from "../../../Components/device/InfoOffice/CardInfoOffice";
import CardInfoUser from "../../../Components/device/InfoUser/CardInfoUser";
import "./DetailsDevices.css";

const DetailsDevice = () => {
  return (
    <div className="container">
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
    </div>
  );
};

export default DetailsDevice;
