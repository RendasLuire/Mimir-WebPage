import { useParams } from "react-router-dom";
import { useEffect } from "react";
import InfoDevice from "../../Components/device/InfoDevice";
import AssignmentDevice from "../../Components/device/AssignmentDevice";
import useDevice from "../../hooks/useDevice";
import { CircularProgress } from "@mui/material";
import MGMTMonitor from "../../Components/device/MGMTMonitor";
import BarInfoDevice from "../../Components/device/BarInfoDevice";

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
              <div className="m-3">
                <BarInfoDevice />
              </div>
              <div className="m-3">
                <div className="row g-0">
                  <div className="col m-1">
                    <div className="p-3">
                      <InfoDevice />
                    </div>
                  </div>
                  <div className="col m-1">
                    <div className="p-3">
                      <AssignmentDevice />
                    </div>
                  </div>
                  {deviceData.typeDevice === "computer" && (
                    <div className="col m-1">
                      <div className="p-3">
                        <MGMTMonitor />
                      </div>
                    </div>
                  )}
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
