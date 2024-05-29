import { useEffect, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import Global from "../../helpers/Global";
import useDevice from "../../hooks/useDevice";
import useAuth from "../../hooks/useAuth";
import { CircularProgress } from "@mui/material";

const ShowAssignmentInfo = () => {
  const { deviceData, setUpdate } = useDevice();
  const [personInfo, setPersonInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const { auth } = useAuth();

  const getPerson = async () => {
    try {
      const token = localStorage.getItem("token");
      const { person } = deviceData;

      if (!token || !deviceData || !person.id) {
        return;
      }

      const request = await fetch(Global.url + "persons/" + person.id, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      const response = await request.json();

      const { data } = response;

      setLoading(false);
      setPersonInfo(data);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPerson();
  }, [deviceData]);

  const handleUnassignClick = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return false;
      }

      const messageUpdate = {
        userTI: auth._id,
      };

      const request = await fetch(
        Global.url + "device/unassing/" + deviceData._id,
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
                  <p>{personInfo.department.name}</p>
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
