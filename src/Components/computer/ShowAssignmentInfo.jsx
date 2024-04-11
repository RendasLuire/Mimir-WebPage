import { useEffect, useState } from "react";
import Global from "../../helpers/Global";
import useComputer from "../../hooks/useComputer";

const ShowAssignmentInfo = () => {
  const { computerInfo } = useComputer();
  const [personInfo, setPersonInfo] = useState(null);

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

  return (
    <div className="container glass">
      <div className="card glass">
        <div className="">
          <label>Name:</label>
          {personInfo && personInfo.name ? (
            <h5>{personInfo.name}</h5>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowAssignmentInfo;
