import PersonIcon from "@mui/icons-material/Person";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import "./CardInfoUser.css";

const CardInfoUser = () => {
  return (
    <div className="container-info-user card">
      <div className="icon card-img-top card-header">
        <PersonIcon sx={{ width: 100, height: 100 }} />
      </div>
      <div className="info card-body">
        <p>
          <label>Dummy</label>
          <span>Nombre</span>
        </p>
        <p>
          <label>Dummy</label>
          <span>Puesto</span>
        </p>
        <p>
          <label>Dummy</label>
          <span>Departamento</span>
        </p>
        <p>
          <label>Dummy</label>
          <span>Unidad de negocio</span>
        </p>
      </div>
      <div className="btn-group card-footer">
        <button className="btn btn-secondary">
          <ChangeCircleIcon />
        </button>
      </div>
    </div>
  );
};

export default CardInfoUser;
