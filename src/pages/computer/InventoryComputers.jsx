import { useCallback, useEffect, useState } from "react";
import Global from "../../helpers/Global";
import SearchComputer from "../../Components/computer/SearchComputer";
import ButtonAddComputer from "../../Components/computer/ButtonAddComputer";
import CardComputer from "../../Components/computer/CardComputer";

const InventoryComputers = () => {
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
      <div className="d-flex justify-content-center mt-3 mb-3 glass">
        <div className="col-6">
          <SearchComputer setFilter={updateFilter} computers={computers} />
        </div>
        <div className="m-3">
          <ButtonAddComputer />
        </div>
      </div>
      <div className="container glass mt-3 mb-3">
        <h3>Inventary</h3>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {filter.map((item) => (
            <div key={item._id} className="col">
              <CardComputer computer={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InventoryComputers;
