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

const DetailsDevice = () => {
  const { id } = useParams();
  const { setDeviceData, deviceData } = useDevice({});
  const [loading, setLoading] = useState(true);
  const [validationResponsive, setvalidationResponsive] = useState(false);

  const getDevice = async () => {
    try {
      setDeviceData({ _id: id });
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const iconMap = {
    Computadora: <ComputerOutlinedIcon sx={{ width: 150, height: 150 }} />,
    Impresora: <LocalPrintshopOutlinedIcon sx={{ width: 150, height: 150 }} />,
    Monitor: <MonitorOutlinedIcon sx={{ width: 150, height: 150 }} />,
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

  const handleCreateResponsiva = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token || !deviceData._id) {
        throw new Error("No se encontró el token de autenticación.");
      }

      const request = await fetch(
        Global.url + "reports/responsiveCSM/" + deviceData._id,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      const blob = await request.blob();
      const url = window.URL.createObjectURL(blob);
      window.open(url, "_blank");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDevice();
    validation();
    setLoading(false);
  }, []);

  return (
    <div className="content glass m-1">
      {loading ? (
        <div className="d-flex justify-content-center">
          <CircularProgress />
        </div>
      ) : (
        <>
          {deviceData.serialNumber ? (
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
                        <p className="card-text">{deviceData.status}</p>
                      </div>
                    </div>
                    <div className="col col-md-1 glass m-1 align-content-center text-center">
                      {validationResponsive.data === false ? (
                        <Alert variant="outlined" severity="error">
                          {validationResponsive.message}
                        </Alert>
                      ) : (
                        <button
                          className="btn btn-info"
                          onClick={handleCreateResponsiva}
                          disabled={!validationResponsive.data}
                        >
                          Crear responsiva
                        </button>
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
                  {deviceData.type !== "Monitor" && (
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
          ) : (
            <div className="d-flex justify-content-center">
              <CircularProgress />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DetailsDevice;
