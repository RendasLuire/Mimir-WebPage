import { useParams } from "react-router-dom";
import ComputerOutlinedIcon from "@mui/icons-material/ComputerOutlined";
import { useEffect } from "react";
import Global from "../../helpers/Global";
import MovementsComputer from "../../Components/computer/MovementsComputer";
import InfoComputer from "../../Components/computer/InfoComputer";
import AssignmentComputer from "../../Components/computer/AssignmentComputer";
import useComputer from "../../hooks/useComputer";

const DetailsComputer = () => {
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

  const iconMap = {
    computer: <ComputerOutlinedIcon sx={{ width: 150, height: 150 }} />,
  };
  const type = "computer";
  const icon = iconMap[type] || null;

  return (
    <div className="content glass m-1">
      <div className="card glass m-3">
        <div className="row g-0">
          <div className="glass col-md-1 m-1">
            <div className="img-fluid rounded-start">{icon}</div>
          </div>
          <div className="col glass m-1">
            <div className="card-body">
              <h5 className="card-title">{computerInfo.hostname}</h5>
              <p className="card-text">
                {computerInfo.brand + " " + computerInfo.model}
              </p>
              <p className="card-text">{computerInfo.status}</p>
            </div>
          </div>
          <div className="col glass m-1">
            <p>Monitor</p>
          </div>
        </div>
      </div>
      <div className="glass m-3">
        <div className="row g-0">
          <div className="col m-1">
            <div className="glass p-3">
              <p>Informacion</p>
              <InfoComputer />
            </div>
          </div>
          <div className="col m-1">
            <div className="glass p-3">
              <p>Usuario</p>
              <AssignmentComputer />
            </div>
          </div>
          <div className="col m-1">
            <div className="glass p-3">
              <p>Monitor</p>
              <label>Imaginate la informacion del monitor aqui</label>
            </div>
          </div>
        </div>
      </div>
      <div className="glass m-3">
        <div className="glass">
          <p>Historial</p>
          <MovementsComputer />
        </div>
      </div>
    </div>
  );
};

export default DetailsComputer;
