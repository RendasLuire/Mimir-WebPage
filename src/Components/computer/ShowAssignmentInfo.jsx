import { useEffect, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import Global from "../../helpers/Global";
import useComputer from "../../hooks/useComputer";
import useAuth from "../../hooks/useAuth";

const ShowAssignmentInfo = () => {
  const { computerInfo, setComputerInfo } = useComputer();
  const [personInfo, setPersonInfo] = useState(null);
  const { auth } = useAuth();

  const getPerson = async () => {
    const token = localStorage.getItem("token");

    if (!token || !computerInfo || !computerInfo.userId) {
      return;
    }

    const request = await fetch(Global.url + "persons/" + computerInfo.userId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const data = await request.json();

    setPersonInfo(data.person);
  };

  useEffect(() => {
    getPerson();
  }, [computerInfo]);

  const handleUnassignClick = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      return false;
    }

    const messageUpdate = {
      userId: "unassigned",
      userName: "unassigned",
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
      userId: "unassigned",
      userName: "unassigned",
    };

    setComputerInfo(updatedComputerInfo);
  };

  return (
    <div className="container glass">
      <div className="card w-100 glass m-1 d-flex flex-column align-items-center justify-content-center position-relative">
        <div className="glass m-2">
          <PersonIcon sx={{ width: 150, height: 150 }} />
        </div>
        <div className="card-body text-center">
          {personInfo && personInfo.name ? (
            <div>
              <h5 className="card-title">Name:</h5>
              <p className="card-text">{personInfo.name}</p>
              <label className="card-title">Position:</label>
              <p>{personInfo.position}</p>
              <h5 className="card-title">Department:</h5>
              <p>{personInfo.department}</p>
              <h5 className="card-title">Manager:</h5>
              <p>{personInfo.manager}</p>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
      <div className="content text-center">
        <button
          className="btn btn-info btn-lg"
          onClick={() => handleUnassignClick()}
        >
          unassign
        </button>
      </div>
    </div>
  );
};

export default ShowAssignmentInfo;
