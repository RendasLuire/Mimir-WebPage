import PersonIcon from "@mui/icons-material/Person";
import CircleIcon from "@mui/icons-material/Circle";
import { Link } from "react-router-dom";
import { capitalizeFirstLetterOfEachWord } from "../../helpers/Tools.js";

const CardPersons = ({ user }) => {
  const { _id, name, position, department } = user;

  return (
    <Link
      to={`/inventory/users/details/${_id}`}
      className="card device-card w-100 glass m-1 d-flex flex-column align-items-center justify-content-center position-relative text-decoration-none"
    >
      <div className="card-icon mx-2">
        <PersonIcon sx={{ width: 100, height: 100 }} />
      </div>
      <div className="position-absolute top-0 start-0 circle-icon">
        <CircleIcon />
      </div>
      <div className="card-body text-center">
        <h5 className="card-title">{capitalizeFirstLetterOfEachWord(name)}</h5>
        <p className="card-text">{capitalizeFirstLetterOfEachWord(position)}</p>
        <p className="card-text">
          {capitalizeFirstLetterOfEachWord(department.name)}
        </p>
      </div>
    </Link>
  );
};

export default CardPersons;
