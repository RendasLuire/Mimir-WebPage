import { useEffect, useState } from "react";
import Global from "../../helpers/Global";
import useDevice from "../../hooks/useDevice";
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
    <div className="card glass text-center">
      <div className="card-body">
        <PrintResponsiveButton
          validationResponsive={validationResponsive.data}
        />
        <p className="card-text">
          <small className="text-body-secondary">Responsiva</small>
        </p>
      </div>
    </div>
  );
};

export default PrintResponsiveCard;
