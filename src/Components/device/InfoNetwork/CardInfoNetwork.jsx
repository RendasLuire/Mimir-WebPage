import LanIcon from "@mui/icons-material/Lan";
import "./CardInfoNetwork.css";
const CardInfoNetwork = () => {
  return (
    <div className="container-info-network card">
      <div className="row">
        <div className="icon col-md-4 img-fluid rounded-start">
          <LanIcon sx={{ height: 70, width: 70 }} />
        </div>
        <div className="col-md-8">
          <div className="info card-body">
            <p>
              <label>000.000.000.000</label>
              <span>IP</span>
            </p>
            <p>
              <label>00:00:00:00:00:00</label>
              <span>MAC Ethernet</span>
            </p>
            <p>
              <label>00:00:00:00:00:00</label>
              <span>MAC WIFI</span>
            </p>
          </div>
        </div>
        <div className="card-footer btn-group">
          <button type="button" className="btn btn-primary">
            Cambiar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardInfoNetwork;
