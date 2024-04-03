import { useEffect } from "react";
import { useState } from "react";
import Global from "../../helpers/Global";
import CardComputer from "./CardComputer";

const ListAllComputers = () => {
  const [computers, setComputers] = useState([]);

  const getComputers = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      return false;
    }

    const request = await fetch(Global.url + "computers/listall", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const data = await request.json();

    setComputers(data);
  };

  useEffect(() => {
    getComputers();
  }, []);

  return (
    <div className="container mt-3">
      <div className="card-group">
        {computers.map((item) => (
          <CardComputer
            key={item._id}
            hostname={item.serialNumber}
            type={item.type}
          />
        ))}
      </div>
    </div>
  );
};

export default ListAllComputers;
