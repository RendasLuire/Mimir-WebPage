import { useParams } from "react-router-dom";
import "./DetailsDevice.css";
import useDevice from "../../hooks/useDevice";
import { useEffect } from "react";
import LoadingCard from "../../components/private/LoadingCard/LoadingCard";
import DetailsDeviceCard from "../../components/private/DetailsDeviceCard/DetailsDeviceCard";

const DetailsDevice = () => {
  const { id } = useParams();
  const { setDeviceData, loading } = useDevice({});

  useEffect(() => {
    setDeviceData({ _id: id });
  }, [id, setDeviceData]);
  return (
    <div className="details-device">
      {loading ? (
        <LoadingCard />
      ) : (
        <div className="grid-container">
          <div className="grid-item info">
            <DetailsDeviceCard />
          </div>
          <div className="grid-item monitor">CardInfoMonitor</div>
          <div className="grid-item user">CardInfoUser</div>
          <div className="grid-item network">CardInfoNetwork</div>
          <div className="grid-item office">CardInfoOffice</div>
          <div className="grid-item extras">CardInfoExtras</div>
          <div className="grid-item comments">CardInfoComments</div>
        </div>
      )}
    </div>
  );
};

export default DetailsDevice;
