import { useEffect, useState } from "react";
import useComputer from "../../hooks/useComputer";
import { CircularProgress } from "@mui/material";
import ListMonitors from "./ListMonitors";
import ShowInfoMonitor from "./ShowInfoMonitor";

const MGMTMonitor = () => {
  const { computerInfo } = useComputer();
  const { monitor } = computerInfo;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (computerInfo) {
      setLoading(false);
    }
  }, [computerInfo]);

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
