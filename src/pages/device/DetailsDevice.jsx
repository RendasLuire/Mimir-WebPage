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
    <div className="content m-1">
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
              <div className="m-1">
                <BarInfoDevice />
              </div>
              <div className="m-3">
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 mx-3">
                  <ComentsChatDevice className="" />
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default DetailsDevice;
