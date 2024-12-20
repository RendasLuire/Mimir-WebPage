import "./CardInfoOffice.css";
import officeIcon from "../../../icons/office.ico";
const CardInfoOffice = () => {
  return (
    <div className="card container-info-office">
      <div className="card-header card-img-top">
        <img src={officeIcon} alt="Office" />
      </div>
      <div className="card-body info">
        <p>
          <label>Dummy</label>
          <span>Version de office</span>
        </p>
        <p>
          <label>XXXX-XXXX-XXXX-XXXX</label>
          <span>Key de activacion</span>
        </p>
      </div>
      <div className="card-footer btn-group">
        <button type="button" className="btn btn-success">
          Cambiar
        </button>
      </div>
    </div>
  );
};

export default CardInfoOffice;
