import { useEffect, useState } from "react";
import Global from "../../helpers/Global";
import useComputer from "../../hooks/useComputer";

const ShowAssignmentInfo = () => {
  const { computerInfo } = useComputer();
  const [personInfo, setPersonInfo] = useState({});

  const getPerson = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      return false;
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
  }, []);

  return (
    <div className="container glass">
      <div className="card glass">
        <div className="">
          <label>Name:</label>
          <h5>{personInfo.name}</h5>
        </div>
      </div>
    </div>
  );
};

export default ShowAssignmentInfo;
