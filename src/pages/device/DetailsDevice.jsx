import { useParams } from "react-router-dom";
import { useEffect } from "react";
import useDevice from "../../hooks/useDevice";
import { CircularProgress } from "@mui/material";
import BarInfoDevice from "../../Components/device/BarInfoDevice";
import ComentsChatDevice from "../../Components/device/ComentsChatDevice";

const DetailsDevice = () => {
  const { id } = useParams();
  const { setDeviceData, deviceData, loading } = useDevice({});

  useEffect(() => {
    setDeviceData({ _id: id });
  }, [id, setDeviceData]);

  return (
    <div className="details-device-container">
      {loading ? (
        <div className="d-flex justify-content-center">
          <CircularProgress />
        </div>
      ) : (
        <>
          {!deviceData.serialNumber ? (
            <div className="d-flex justify-content-center">
              <CircularProgress />
            </div>
          ) : (
            <>
              {/* Barra de información arriba */}
              <div className="bar-info-container">
                <BarInfoDevice />
              </div>

              {/* Contenedor del chat a la izquierda */}
              <div className="chat-container">
                <ComentsChatDevice />
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default DetailsDevice;
