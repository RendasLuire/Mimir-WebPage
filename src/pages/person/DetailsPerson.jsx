import PersonIcon from "@mui/icons-material/Person";
import usePerson from "../../hooks/usePerson";
import { useEffect, useState } from "react";
import Global from "../../helpers/Global";
import { useParams } from "react-router-dom";
import InfoPerson from "../../Components/person/InfoPerson";
import MovementsPerson from "../../Components/person/MovementsPerson";
import AssignmentPersonManager from "../../Components/person/AssignmentPersonManager";
import ShowDevicesAssignment from "../../Components/person/ShowDevicesAssignment";
import { CircularProgress } from "@mui/material";

const DetailsPerson = () => {
  const { personInfo, setPersonInfo } = usePerson();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  const getPerson = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return false;
      }

      const request = await fetch(Global.url + "persons/" + id, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      const response = await request.json();

      const { data } = response;

      setPersonInfo(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPerson();
  }, []);

  return (
    <div className="content glass m-1">
      {loading ? (
        <CircularProgress />
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
                  <h5 className="card-title">{personInfo.name}</h5>
                  <p className="card-text">{personInfo.position}</p>
                  <p className="card-text">{personInfo.department}</p>
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
