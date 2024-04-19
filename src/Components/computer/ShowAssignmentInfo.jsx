import { useEffect, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import Global from "../../helpers/Global";
import useComputer from "../../hooks/useComputer";
import useAuth from "../../hooks/useAuth";
import { CircularProgress } from "@mui/material";

const ShowAssignmentInfo = () => {
  const { computerInfo, setComputerInfo } = useComputer();
  const [personInfo, setPersonInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const { auth } = useAuth();

  const getPerson = async () => {
    try {
      const token = localStorage.getItem("token");
      const { user } = computerInfo;

      if (!token || !computerInfo || !user.id) {
        console.log("algo falto");
        console.log("token: " + token);
        console.log("computerInfo: " + computerInfo);
        console.log("user: " + JSON.stringify(computerInfo.user));
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

      setLoading(false);
      setPersonInfo(person);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPerson();
  }, [computerInfo]);

  const handleUnassignClick = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return false;
      }

      if (computerInfo.monitor.id !== "Sin asignar") {
        const messageUpdateMonitor = {
          user: {
            id: "Sin asignar",
            name: "Sin asignar",
          },
          userTI: auth._id,
        };

        const requestMonitor = await fetch(
          Global.url + "computers/update/" + computerInfo.monitor.id,
          {
            method: "PATCH",
            body: JSON.stringify(messageUpdateMonitor),
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
          }
        );
        await requestMonitor.json();
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
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      {loading ? (
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
              {personInfo && personInfo._id ? (
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
