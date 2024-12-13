import CardInfoDevice from "../../../Components/device/InfoDevice/CardInfoDevice";
import CardInfoMonitor from "../../../Components/device/InfoMonitor/CardInfoMonitor";
import CardInfoNetwork from "../../../Components/device/InfoNetwork/CardInfoNetwork";
import CardInfoUser from "../../../Components/device/InfoUser/CardInfoUser";
import "./DetailsDevices.css";

const DetailsDevice = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-md-2 mb-2">
          <div className="device">
            <CardInfoDevice />
          </div>
        </div>
        <div className="col-12 col-md-2 mb-2">
          <div className="monitor mt-2">
            <CardInfoMonitor />
          </div>
        </div>
        <div className="col-12 col-md-2 mb-2">
          <div className="user glass">
            <CardInfoUser />
          </div>
        </div>
        <div className="col-12 col-md-2 mb-2">
          <div className="network glass mt-2">
            <CardInfoNetwork />
          </div>
          <div className="row mt-2">
            <div className="col-6 mb-2">
              <div className="office glass">
                <h1>Office</h1>
              </div>
            </div>
            <div className="col-6 mb-2">
              <div className="extras glass">
                <h1>Extras</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-2 mb-2">
          <div className="comments glass">
            <h1>Comentarios</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsDevice;
