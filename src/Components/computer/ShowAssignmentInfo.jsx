import { useEffect, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import Global from "../../helpers/Global";
import useComputer from "../../hooks/useComputer";
import useAuth from "../../hooks/useAuth";
import { CircularProgress } from "@mui/material";

const ShowAssignmentInfo = () => {
  const { computerInfo, setComputerInfo } = useComputer();
  const [personInfo, setPersonInfo] = useState(null);
  const [loging, setLogin] = useState(true);
  const { auth } = useAuth();

  const getPerson = async () => {
    try {
      const token = localStorage.getItem("token");
      const { user } = computerInfo;

      if (!token || !computerInfo || !user.id) {
        return;
      }

      const request = await fetch(Global.url + "persons/" + user.id, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      const response = await request.json();

      const { person } = response.data;

      setPersonInfo(person);
      setLogin(false);
    } catch (error) {
      setLogin(false);
    }
  };

  useEffect(() => {
    getPerson();
  }, [computerInfo]);

  const handleUnassignClick = async () => {
    setLogin(true);
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return false;
      }

      const messageUpdate = {
        user: {
          id: "Sin asignar",
          name: "Sin asignar",
        },
        userTI: auth._id,
      };

      const request = await fetch(
        Global.url + "computers/update/" + computerInfo._id,
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

      const updatedComputerInfo = {
        ...computerInfo,
        user: {
          id: "Sin asignar",
          name: "Sin asignar",
        },
      };

      setComputerInfo(updatedComputerInfo);
      setLogin(false);
    } catch (error) {
      setLogin(false);
    }
  };

  return (
    <div className="container">
      {loging ? (
        <div className="d-flex justify-content-center">
          <CircularProgress />
        </div>
      ) : (
        <>
          <div className="card glass w-100 m-1 align-items-center">
            <div className="glass m-2">
              <PersonIcon sx={{ width: 150, height: 150 }} />
            </div>
            <div className="card-body text-center">
              {personInfo && personInfo.name ? (
                <div>
                  <h5 className="card-title">Nombre:</h5>
                  <p className="card-text">{personInfo.name}</p>
                  <label className="card-title">Posicion:</label>
                  <p>{personInfo.position}</p>
                  <h5 className="card-title">Departamento:</h5>
                  <p>{personInfo.department}</p>
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
        </>
      )}
    </div>
  );
};

export default ShowAssignmentInfo;
