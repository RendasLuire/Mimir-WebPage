import ComputerOutlinedIcon from "@mui/icons-material/ComputerOutlined";
import CircleIcon from "@mui/icons-material/Circle";
import InfoComputer from "./InfoComputer";
import { useState } from "react";
import MovementsComputer from "./MovementsComputer";

const CardComputer = ({ computer }) => {
  const { _id, hostname, model, user, brand, serialNumber, status, type } =
    computer;
  const iconMap = {
    computer: <ComputerOutlinedIcon sx={{ width: 150, height: 150 }} />,
  };

  const colorMap = {
    available: "success",
  };

  const icon = iconMap[type] || null;

  const color = colorMap[status] || null;

  const [activeTab, setActiveTab] = useState("info");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <button
        type="button"
        data-bs-target={`#${_id}`}
        data-bs-toggle="modal"
        className="card w-15 glass m-1 flex-column justify-content-center align-items-center"
      >
        {icon && <div className="glass m-2">{icon}</div>}
        <div className="position-absolute top-0 start-0">
          <CircleIcon color={color} />
        </div>
        <div className="card-body">
          <label className="text-center">Hostname:</label>
          <h5 className="card-title">{hostname}</h5>
          <label>Info:</label>
          <p className="card-text">
            {brand} {model}
          </p>
          <label>User:</label>
          <p className="card-text">{user}</p>
        </div>
      </button>
      <div
        className="modal fade"
        id={`${_id}`}
        aria-labelledby="Modal computer"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1>{hostname}</h1>
              <button
                className="btn-close"
                type="button"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="card glass m-3 d-flex flex-column justify-content-center align-items-center">
                {icon && <div className="glass m-2">{icon}</div>}
              </div>
              <div className="countainer">
                <div className="card glass">
                  <div className="card-header">
                    <ul className="nav nav-tabs">
                      <li className="nav-item">
                        <button
                          className={`nav-link ${
                            activeTab === "info" && "active"
                          }`}
                          onClick={() => handleTabChange("info")}
                        >
                          Info
                        </button>
                      </li>
                      <li className="nav-ling">
                        <button
                          className={`nav-link ${
                            activeTab === "History" && "active"
                          }`}
                          onClick={() => handleTabChange("History")}
                        >
                          History
                        </button>
                      </li>
                    </ul>
                    <div className="tab-content">
                      <div
                        className={`tab-pane fade ${
                          activeTab === "info" && "show active"
                        }`}
                      >
                        <InfoComputer computer={computer} />
                      </div>
                      <div
                        className={`tab-pane fade ${
                          activeTab === "History" && "show active"
                        }`}
                      >
                        <MovementsComputer id={_id} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardComputer;
