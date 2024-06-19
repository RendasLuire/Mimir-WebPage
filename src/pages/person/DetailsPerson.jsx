import PersonIcon from "@mui/icons-material/Person";
import usePerson from "../../hooks/usePerson";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import InfoPerson from "../../Components/person/InfoPerson";
import MovementsPerson from "../../Components/person/MovementsPerson";
import AssignmentPersonManager from "../../Components/person/AssignmentPersonManager";
import ShowDevicesAssignment from "../../Components/person/ShowDevicesAssignment";
import { CircularProgress } from "@mui/material";

const DetailsPerson = () => {
  const { personData, setPersonData, loading } = usePerson();
  const { id } = useParams();

  useEffect(() => {
    setPersonData({ _id: id });
  }, [id, setPersonData]);

  return (
    <div className="content glass m-1">
      {loading ? (
        <div className="d-flex justify-content-center">
          <CircularProgress />
        </div>
      ) : !personData.name ? (
        <div className="d-flex justify-content-center">
          <CircularProgress />
        </div>
      ) : (
        <>
          <div className="card glass m-3">
            <div className="row g-0">
              <div className="col-md-1 m-1">
                <div className="img-fluid rounded-start">
                  <PersonIcon sx={{ width: 150, height: 150 }} />
                </div>
              </div>
              <div className="col">
                <div className="card-body">
                  <h5 className="card-title">{personData.name}</h5>
                  <p className="card-text">{personData.position}</p>
                  <p className="card-text">{personData.department?.name}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="glass m-3">
            <div className="row g-0">
              <div className="col m-1">
                <div className="glass p-3">
                  <InfoPerson />
                </div>
              </div>
              <div className="col m-1">
                <div className="glass p-3">
                  <AssignmentPersonManager />
                </div>
              </div>
            </div>
          </div>
          <div className="glass m-3">
            <div className="glass">
              <ShowDevicesAssignment />
            </div>
          </div>
          <div className="glass m-3">
            <div className="glass">
              <MovementsPerson />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DetailsPerson;
