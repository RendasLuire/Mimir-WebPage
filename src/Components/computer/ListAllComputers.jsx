import { useEffect, useState, useCallback } from "react";
import Global from "../../helpers/Global";
import CardComputer from "./CardComputer";
import SearchComputer from "./SearchComputer";

const ListAllComputers = () => {
  const [computers, setComputers] = useState([]);
  const [filter, setFilter] = useState(computers);

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

  const updateFilter = useCallback((search) => {
    setFilter(search);
  }, []);

  useEffect(() => {
    getComputers();
  }, []);

  return (
    <div className="container glass mt-3">
      <div className="container w-50 row glass ">
        <div className="m-3 col">
          <SearchComputer setFilter={updateFilter} computers={computers} />
        </div>
        <div className="m-3 col">
          <button className="btn btn-success m-3">+</button>
        </div>
      </div>
      <div className="container glass mt-3 mb-3">
        <h3>Inventary</h3>
        <div className=" m-3 p-3">
          <div className="">
            {filter.map((item) => (
              <CardComputer key={item._id} computer={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListAllComputers;
