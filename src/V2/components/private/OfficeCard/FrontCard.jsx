import React from "react";
import officeIcon from "../../../icons/office.ico";

const FrontCard = ({ officeData, setIsFlipped }) => {
  const handleChangeOffice = () => setIsFlipped(true);
  return (
    <div className="card container-info-office">
      <div className="icon card-img-top card-header">
        <img src={officeIcon} alt="Office" />
      </div>
      <div className="card-body info">
        <p>
          <label>{officeData?.officeVersion || ""}</label>
          <span>Version de office</span>
        </p>
        <p>
          <label>{officeData?.officeKey || "xxxx-xxxx-xxxx-xxxx"}</label>
          <span>Key de activacion</span>
        </p>
      </div>
      <div className="card-footer btn-group">
        <button
          type="button"
          className="btn btn-success"
          onClick={handleChangeOffice}
        >
          Cambiar
        </button>
      </div>
    </div>
  );
};

export default FrontCard;
