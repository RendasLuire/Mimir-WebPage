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
    <div className="container align-items-center justify-content-center glass mt-3">
      <div className="container w-50 d-flex align-items-center justify-content-center row glass mt-3">
        <div className="m-3 col">
          <input className="form-control m-3" placeholder="Search" />
        </div>
        <div className="m-3 col">
          <button className="btn btn-success m-3">+</button>
        </div>
      </div>
      <div className="container glass mt-3 align-items-center justify-content-center">
        <h3>Inventory</h3>
        <div className="d-flex m-3 p-3">
          <div className="row row-cols-1 row-cols-md-6 g-4">
            {computers.map((item) => (
              <CardComputer key={item._id} computer={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListAllComputers;
