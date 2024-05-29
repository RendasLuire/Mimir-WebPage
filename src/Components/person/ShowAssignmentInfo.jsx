import PersonIcon from "@mui/icons-material/Person";
import { useEffect, useState } from "react";
import usePerson from "../../hooks/usePerson";
import Global from "../../helpers/Global";
import useAuth from "../../hooks/useAuth";
import { CircularProgress } from "@mui/material";

const ShowAssignmentInfo = () => {
  const { personData, setUpdate } = usePerson();
  const [manager, setManager] = useState({});
  const { auth } = useAuth();

  const getManagerInfo = async () => {
    const token = localStorage.getItem("token");
    const { manager } = personData;

    if (!token) {
      return false;
    }

    const request = await fetch(Global.url + "persons/" + manager.id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const response = await request.json();

    const { data } = response;

    setManager(data);
  };

  useEffect(() => {
    getManagerInfo();
  }, [personData]);

  const handleUnassignClick = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      return false;
    }

    const messageUpdate = {
      userTI: auth._id,
    };
    const request = await fetch(
      Global.url + "persons/unassing/" + personData._id,
      {
        method: "PATCH",
        body: JSON.stringify(messageUpdate),
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );
    await request.json();

    setUpdate(true);
  };

  return (
    <div className="container">
      <div className="card w-100 glass m-1 align-items-center">
        <div className="glass m-2">
          <PersonIcon sx={{ width: 150, height: 150 }} />
        </div>
        <div className="card-body text-center">
          {manager && manager.name ? (
            <div>
              <h5 className="card-title">Nombre:</h5>
              <p className="card-text">{manager.name}</p>
              <h5 className="card-title">Posicion:</h5>
              <p className="card-text">{manager.position}</p>
              <h5 className="card-title">Departamento:</h5>
              <p className="card-text">{manager.department.name}</p>
            </div>
          ) : (
            <div className="d-flex justify-content-center">
              <CircularProgress />
            </div>
          )}
        </div>
      </div>
      <div className="content text-center">
        <button
          className="btn btn-info btn-lg"
          onClick={() => handleUnassignClick()}
        >
          Desasignar
        </button>
      </div>
    </div>
  );
};

export default ShowAssignmentInfo;
