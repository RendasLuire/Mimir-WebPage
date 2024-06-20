import { useEffect, useState } from "react";
import Global from "../../helpers/Global";
import useDevice from "../../hooks/useDevice";
import PrintIcon from "@mui/icons-material/Print";
import PrintResponsiveButton from "./PrintResponsiveButton";

const PrintResponsiveCard = () => {
  const { deviceData } = useDevice({});
  const [validationResponsive, setvalidationResponsive] = useState({
    data: false,
  });
  const validation = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token || !deviceData._id) {
        throw new Error("No se encontró el token de autenticación.");
      }

      const request = await fetch(
        `${Global.url}reports/validationInfo/${deviceData._id}`,
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
    <div className="card-body glass d-flex justify-content-between align-items-center">
      <div className="d-flex flex-column px-2">
        <label className="card-title">
          {validationResponsive.data ? "Completa" : "Incompleta"}
        </label>
        <p className="card-text">
          <small className="text-body-secondary">Responsiva</small>
        </p>
      </div>
      <button className="btn" disabled={!validationResponsive.data}>
        <PrintResponsiveButton>
          <PrintIcon />
        </PrintResponsiveButton>
      </button>
    </div>
  );
};

export default PrintResponsiveCard;
