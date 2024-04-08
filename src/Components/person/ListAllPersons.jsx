import { useEffect, useState } from "react";
import Global from "../../helpers/Global";
import CardPersons from "./CardPersons";

const ListAllPersons = () => {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      return false;
    }

    const request = await fetch(Global.url + "persons/listall", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const data = await request.json();

    setUsers(data);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="container glass mt-3">
      <div className="constainer glass mt-3 mb-3">
        <h1>Persons</h1>
        <div className="row row-cols-1 row-clos-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          <h5>Persons</h5>
          {users.map((item) => (
            <div className="col" key={item._id}>
              <CardPersons user={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListAllPersons;
