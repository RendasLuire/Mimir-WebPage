import MonitorOutlined from "@mui/icons-material/MonitorOutlined";
import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import useDevice from "../../hooks/useDevice";
import Global from "../../helpers/Global";
import useAuth from "../../hooks/useAuth";

const ShowInfoMonitor = () => {
  const [loading, setLoading] = useState(true);
  const [monitorInfo, setMonitorInfo] = useState({});
  const { deviceInfo, setDeviceInfo } = useDevice();
  const { auth } = useAuth();

  const getMonitor = async () => {
    const { monitor } = deviceInfo;

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return false;
      }

      const request = await fetch(Global.url + "computers/" + monitor.id, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      const response = await request.json();
      const { computer } = response.data;

      setMonitorInfo(computer);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMonitor();
  }, []);

  const handleUnassignClick = async () => {
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return false;
      }

      const messageUpdatMonitor = {
        user: {
          id: "Sin asignar",
          name: "Sin asignar",
        },
        userTI: auth._id,
      };

      const messageUpdatComputer = {
        monitor: {
          id: "Sin asignar",
          serialNumber: "Sin asignar",
        },
        userTI: auth._id,
      };

      const requestMonitor = await fetch(
        Global.url + "computers/update/" + monitorInfo._id,
        {
          method: "PATCH",
          body: JSON.stringify(messageUpdatMonitor),
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      const requestComputer = await fetch(
        Global.url + "computers/update/" + deviceInfo._id,
        {
          method: "PATCH",
          body: JSON.stringify(messageUpdatComputer),
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      await requestMonitor.json();
      await requestComputer.json();

      const updatedComputerInfo = {
        ...deviceInfo,
        monitor: {
          id: "Sin asignar",
          serialNumber: "Sin asignar",
        },
      };

      const updatedMonitorInfo = {
        ...monitorInfo,
        user: {
          id: "Sin asignar",
          name: "Sin asignar",
        },
      };

      setDeviceInfo(updatedComputerInfo);
      setMonitorInfo(updatedMonitorInfo);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      {loading ? (
        <div className="d-flex justify-content-center">
          <CircularProgress />
        </div>
      ) : (
        <div className="card w-100 glass m-1 align-items-center">
          <div className="glass m-2">
            <MonitorOutlined sx={{ width: 150, height: 150 }} />
          </div>
          <div className="card-body text-center">
            {monitorInfo && monitorInfo._id ? (
              <div className="container">
                <div className="container">
                  <p className="card-title">
                    {monitorInfo.brand + " " + monitorInfo.model}
                  </p>
                  <p>{monitorInfo.serialNumber} </p>
                </div>
                <div>
                  <button
                    className="btn btn-info"
                    onClick={() => handleUnassignClick()}
                  >
                    Desasignar
                  </button>
                </div>
              </div>
            ) : (
              <div className="d-flex justify-content-center">
                <CircularProgress />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowInfoMonitor;
