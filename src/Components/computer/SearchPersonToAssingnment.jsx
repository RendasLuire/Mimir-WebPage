import { useEffect, useState } from "react";
import Global from "../../helpers/Global";

const SearchPersonToAssingnment = (handleSelectUser) => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState(users);

  const handleInputChange = (event) => {
    setSearch(event.target.value);
  };

  const getPersons = async () => {
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
    getPersons();
  }, []);

  const handleSelectClick = () => {
    console.log();
  };

  return (
    <div className="m-3">
      <h5>Asigna el equipo</h5>
      <div className="m-3">
        <input
          className="form-control"
          placeholder="Buscar usuario"
          value={search}
          onChange={handleInputChange}
        />
      </div>
      <div className="m-3">
        <h5>Usuarios</h5>
        {users.map((item) => (
          <div key={item._id}>
            <button onClick={handleSelectClick}>{item.name}</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPersonToAssingnment;
