import PersonIcon from "@mui/icons-material/Person";
import CircleIcon from "@mui/icons-material/Circle";
import { useState } from "react";
import InfoPerson from "./InfoPerson";
import MovementsPerson from "./MovementsPerson";

const CardPersons = ({ user }) => {
  const [activeTab, setActiveTab] = useState("info");
  const { _id, name, position, department } = user;

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <button
        type="button"
        data-bs-target={`#${_id}`}
        data-bs-toggle="modal"
        className="card w-100 glass m-1 d-flex flex-column align-items-center justify-content-center position-relative"
      >
        <div className="glass m-2">
          <PersonIcon sx={{ width: 150, height: 150 }} />
        </div>
        <div className="position-absolute top-0 start-0">
          <CircleIcon />
        </div>
        <div className="card-body text-center">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">{position}</p>
          <p className="card-text">{department}</p>
        </div>
      </button>

      <div className="modal fade" id={`${_id}`} aria-hidden="true">
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title">{name}</h1>
              <button
                className="btn-close"
                type="button"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body d-flex flex-column align-items-center">
              <div className="card glass m-3 text-center">
                <PersonIcon sx={{ width: 150, height: 150 }} />
              </div>
              <div className="container">
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
                      <li className="nav-item">
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
                  </div>
                  <div className="tab-content">
                    <div
                      className={`tab-pane fade ${
                        activeTab === "info" && "show active"
                      }`}
                    >
                      <InfoPerson person={user} />
                    </div>
                    <div
                      className={`tab-pane fade ${
                        activeTab === "History" && "show active"
                      }`}
                    >
                      <MovementsPerson id={_id} />
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

export default CardPersons;
