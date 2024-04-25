import { useEffect, useState } from "react";
import useDevice from "../../hooks/useDevice";
import { CircularProgress } from "@mui/material";
import ListMonitors from "./ListMonitors";
import ShowInfoMonitor from "./ShowInfoMonitor";

const MGMTMonitor = () => {
  const { deviceInfo } = useDevice();
  const { monitor } = deviceInfo;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (deviceInfo) {
      setLoading(false);
    }
  }, [deviceInfo]);

  return (
    <div>
      {loading ? (
        <div className="d-flex justify-content-center">
          <CircularProgress />
        </div>
      ) : monitor.id === "Sin asignar" ? (
        <>
          <ListMonitors />
        </>
      ) : (
        <>
          <ShowInfoMonitor />
        </>
      )}
    </div>
  );
};

export default MGMTMonitor;
