import { useParams } from "react-router-dom";
import ComputerOutlinedIcon from "@mui/icons-material/ComputerOutlined";
import { useEffect, useState } from "react";
import Global from "../../helpers/Global";
import MovementsDevice from "../../Components/device/MovementsDevice";
import InfoDevice from "../../Components/device/InfoDevice";
import AssignmentDevice from "../../Components/device/AssignmentDevice";
import useDevice from "../../hooks/useDevice";
import Alert from "@mui/material/Alert";
import { CircularProgress } from "@mui/material";
import MGMTMonitor from "../../Components/device/MGMTMonitor";
import MonitorOutlinedIcon from "@mui/icons-material/MonitorOutlined";
import LocalPrintshopOutlinedIcon from "@mui/icons-material/LocalPrintshopOutlined";
import PrintResponsiveButton from "../../Components/device/PrintResponsiveButton";

const DetailsDevice = () => {
  const { id } = useParams();
  const { setDeviceData, deviceData, loading } = useDevice({});
  const [validationResponsive, setvalidationResponsive] = useState(false);

  useEffect(() => {
    setDeviceData({ _id: id });
  }, [id, setDeviceData]);

  const iconMap = {
    computer: <ComputerOutlinedIcon sx={{ width: 150, height: 150 }} />,
    printer: <LocalPrintshopOutlinedIcon sx={{ width: 150, height: 150 }} />,
    monitor: <MonitorOutlinedIcon sx={{ width: 150, height: 150 }} />,
  };
  const typeDevice = deviceData.typeDevice;
  const icon = iconMap[typeDevice] || null;

  const validation = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token || !deviceData._id) {
        throw new Error("No se encontró el token de autenticación.");
      }

      const request = await fetch(
        Global.url + "reports/validationInfo/" + deviceData._id,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      const response = await request.json();
      setvalidationResponsive(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (deviceData._id) {
      validation();
    }
  }, [deviceData]);

  return (
    <div className="content glass m-1">
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
              <div className="card glass m-3">
                <>
                  <div className="row g-0">
                    <div className="glass col-md-1 m-1">
                      <div className="img-fluid rounded-start">{icon}</div>
                    </div>
                    <div className="col glass m-1">
                      <div className="card-body">
                        <h5 className="card-title">{deviceData.hostname}</h5>
                        <p className="card-text">
                          {deviceData.brand + " " + deviceData.model}
                        </p>
                        <span className="card-text">{deviceData.details}</span>
                        <p className="card-text">{deviceData.status}</p>
                      </div>
                    </div>
                    <div className="col col-md-1 glass m-1 align-content-center text-center">
                      {!validationResponsive.data ? (
                        <Alert variant="outlined" severity="error">
                          {validationResponsive.message}
                        </Alert>
                      ) : (
                        <PrintResponsiveButton />
                      )}
                    </div>
                  </div>
                </>
              </div>
              <div className="glass m-3">
                <div className="row g-0">
                  <div className="col m-1">
                    <div className="glass p-3">
                      <InfoDevice />
                    </div>
                  </div>
                  <div className="col m-1">
                    <div className="glass p-3">
                      <AssignmentDevice />
                    </div>
                  </div>
                  {deviceData.typeDevice === "computer" && (
                    <div className="col m-1">
                      <div className="glass p-3">
                        <MGMTMonitor />
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="glass m-3">
                <div className="glass">
                  <MovementsDevice />
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
