import usePerson from "../../hooks/usePerson";
import PersonIcon from "@mui/icons-material/Person";
import ManagerAssingCard from "./ManagerAssingCard";
import { capitalizeFirstLetterOfEachWord } from "../../helpers/Tools.js";

const BarInfoPerson = () => {
  const { personData } = usePerson();

  const icon = <PersonIcon sx={{ width: 100, height: 100 }} />;

  return (
    <div className="glass card">
      <div className="row g-0">
        <div className="col-md-1 m-1 text-center">
          <div className="img-fluid rounded-start">{icon}</div>
        </div>
        <div className="col m-1">
          <div className="card-body">
            <h5 className="card-title">
              {capitalizeFirstLetterOfEachWord(personData.name)}
            </h5>
            <p className="card-text">
              {capitalizeFirstLetterOfEachWord(personData.position)}
            </p>
          </div>
        </div>
        <div className="col-3 m-1 py-3">
          <ManagerAssingCard />
        </div>
      </div>
    </div>
  );
};

export default BarInfoPerson;
