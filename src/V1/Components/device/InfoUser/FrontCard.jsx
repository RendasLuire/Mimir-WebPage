import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import PersonIcon from "@mui/icons-material/Person";
import { Tooltip } from "@mui/material";
import { Link } from "react-router-dom";

const FrontCard = ({ userData, setIsFlipped }) => {
  const handleChangeUser = () => setIsFlipped(true);
  return (
    <div className="container-info-user card">
      <Link
        to={`/inventory/users/details/${userData?._id}`}
        className="icon card-img-top card-header"
      >
        <PersonIcon sx={{ width: 50, height: 50 }} />
      </Link>
      <div className="info card-body">
        <p>
          <label>{userData?.name || "-"}</label>
          <span>Nombre</span>
        </p>
        <p>
          <label>{userData?.position || "-"}</label>
          <span>Puesto</span>
        </p>
        <p>
          <label>{userData?.department?.name || "-"}</label>
          <span>Departamento</span>
        </p>
        <p>
          <label>{userData?.bussinesUnit?.name || "-"}</label>
          <span>Unidad de negocio</span>
        </p>
      </div>
      <div className="btn-group card-footer">
        <button className="btn btn-secondary" onClick={handleChangeUser}>
          <Tooltip title="Cambiar Usuario" placement="top">
            <ChangeCircleIcon />
          </Tooltip>
        </button>
      </div>
    </div>
  );
};

export default FrontCard;
