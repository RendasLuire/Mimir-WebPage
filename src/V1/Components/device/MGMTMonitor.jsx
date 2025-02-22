import { useEffect, useState } from "react";
import useDevice from "../../hooks/useDevice";
import { CircularProgress } from "@mui/material";
import ListMonitors from "./ListMonitors";
import ShowInfoMonitor from "./ShowInfoMonitor";

const MGMTMonitor = () => {
  const { deviceData } = useDevice();
  const { monitor } = deviceData;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (deviceData) {
      setLoading(false);
    }
  }, [deviceData]);

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
