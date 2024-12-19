import HeadphonesIcon from "@mui/icons-material/Headphones";
import MouseIcon from "@mui/icons-material/Mouse";
import CableIcon from "@mui/icons-material/Cable";
import PestControlRodentIcon from "@mui/icons-material/PestControlRodent";
import "./CardInfoExtras.css";

const CardInfoExtras = () => {
  return (
    <div className="card container-info-extras">
      <div className="card">
        <div className="card-body">
          <button type="button" className="btn btn-success icon">
            <HeadphonesIcon sx={{ fontSize: 50 }} />
          </button>
        </div>
        <div className="card-footer">
          <span>00/00/0000</span>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <button type="button" className="btn btn-success icon">
            <MouseIcon sx={{ fontSize: 50 }} />
          </button>
        </div>
        <div className="card-footer">
          <span>00/00/0000</span>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <button type="button" className="btn btn-success icon">
            <CableIcon sx={{ fontSize: 50 }} />
          </button>
        </div>
        <div className="card-footer">
          <span>00/00/0000</span>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <button type="button" className="btn btn-success icon">
            <PestControlRodentIcon sx={{ fontSize: 50 }} />
          </button>
        </div>
        <div className="card-footer">
          <span>00/00/0000</span>
        </div>
      </div>
    </div>
  );
};

export default CardInfoExtras;
