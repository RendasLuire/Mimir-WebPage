import { useParams } from "react-router-dom";
import ComputerOutlinedIcon from "@mui/icons-material/ComputerOutlined";
import { useEffect, useState } from "react";
import Global from "../../helpers/Global";
import MovementsComputer from "../../Components/computer/MovementsComputer";
import InfoComputer from "../../Components/computer/InfoComputer";
import AssignmentComputer from "../../Components/computer/AssignmentComputer";
import useComputer from "../../hooks/useComputer";

const DetailsComputer = () => {
  const [activeTab, setActiveTab] = useState("info");
  const { id } = useParams();
  const { setComputerInfo, computerInfo } = useComputer();

  const getComputer = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      return false;
    }

    const request = await fetch(Global.url + "computers/" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const data = await request.json();

    setComputerInfo(data);
  };

  useEffect(() => {
    getComputer();
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const iconMap = {
    computer: <ComputerOutlinedIcon sx={{ width: 150, height: 150 }} />,
  };
  const type = "computer";
  const icon = iconMap[type] || null;

  return (
    <div className="content glass m-1">
      <div className="card glass m-3">
        <div className="row g-0">
          <div className="col-md-2 m-1">
            <div className="img-fluid rounded-start">{icon}</div>
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{computerInfo.hostname}</h5>
              <p className="card-text">
                {computerInfo.brand + " " + computerInfo.model}
              </p>
              <p className="card-text">{computerInfo.status}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="container glass m-1">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "info" && "active"}`}
              onClick={() => handleTabChange("info")}
            >
              Info
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "History" && "active"}`}
              onClick={() => handleTabChange("History")}
            >
              History
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "Assignament" && "active"}`}
              onClick={() => handleTabChange("Assignament")}
            >
              Assignament
            </button>
          </li>
        </ul>
        <div className="tab-content">
          <div
            className={`tab-pane fade ${activeTab === "info" && "show active"}`}
          >
            <InfoComputer />
          </div>
          <div
            className={`tab-pane fade ${
              activeTab === "History" && "show active"
            }`}
          >
            <MovementsComputer />
          </div>
          <div
            className={`tab-pane fade ${
              activeTab === "Assignament" && "show active"
            }`}
          >
            <AssignmentComputer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsComputer;
