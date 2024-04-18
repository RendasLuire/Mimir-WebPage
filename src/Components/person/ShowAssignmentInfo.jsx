import PersonIcon from "@mui/icons-material/Person";
import { useEffect, useState } from "react";
import usePerson from "../../hooks/usePerson";
import Global from "../../helpers/Global";
import useAuth from "../../hooks/useAuth";

const ShowAssignmentInfo = () => {
  const { personInfo, setPersonInfo } = usePerson();
  const [manager, setManager] = useState({});
  const { auth } = useAuth();

  const getManagerInfo = async () => {
    const token = localStorage.getItem("token");
    const { manager } = personInfo;

    if (!token) {
      return false;
    }

    const request = await fetch(Global.url + "persons/" + manager.managerId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const response = await request.json();

    const { person } = response.data;

    setManager(person);
  };

  useEffect(() => {
    getManagerInfo();
  }, [personInfo]);

  const handleUnassignClick = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      return false;
    }

    const messageUpdate = {
      manager: {
        managerId: "Sin asignar",
        managerName: "Sin asignar",
      },
      userTI: auth._id,
    };
    console.log(messageUpdate);

    const request = await fetch(
      Global.url + "persons/update/" + personInfo._id,
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
    const updatedPersonInfo = {
      ...personInfo,
      manager: {
        managerId: "Sin asignar",
        managerName: "Sin asignar",
      },
    };

    setPersonInfo(updatedPersonInfo);
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
              <p className="card-text">{manager.department}</p>
            </div>
          ) : (
            <p>Cargando...</p>
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
