import React from "react";
import LanIcon from "@mui/icons-material/Lan";

const FrontCard = ({ networkData, setIsFlipped }) => {
  const handleChangeNetwork = () => setIsFlipped(true);
  return (
    <div className="container-info-network card">
      <div className="icon card-img-top card-header">
        <LanIcon sx={{ height: 70, width: 70 }} />
      </div>

      <div className="info card-body">
        <p>
          <label>{networkData?.ip || "000.000.000.000"}</label>
          <span>IP</span>
        </p>
        <p>
          <label>{networkData?.macEthernet || "00:00:00:00:00:00"}</label>
          <span>MAC Ethernet</span>
        </p>
        <p>
          <label>{networkData?.macWifi || "00:00:00:00:00:00"}</label>
          <span>MAC WIFI</span>
        </p>
      </div>

      <div className="card-footer btn-group">
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleChangeNetwork}
        >
          Cambiar
        </button>
      </div>
    </div>
  );
};

export default FrontCard;
