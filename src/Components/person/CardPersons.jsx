import PersonIcon from "@mui/icons-material/Person";
import CircleIcon from "@mui/icons-material/Circle";
import { Link } from "react-router-dom";

const CardPersons = ({ user }) => {
  const { _id, name, position, department, managerName } = user;

  return (
    <>
      <Link
        to={`/inventory/users/details/${_id}`}
        className="card w-100 glass m-1 d-flex flex-column align-items-center justify-content-center position-relative text-decoration-none"
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
          <p className="card-text">{department.name}</p>
          <p className="card-text">{managerName}</p>
        </div>
      </Link>
    </>
  );
};

export default CardPersons;
