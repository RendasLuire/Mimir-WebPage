import { useCallback, useEffect, useState } from "react";
import Global from "../../helpers/Global";
import useComputer from "../../hooks/useComputer";
import useAuth from "../../hooks/useAuth";

const SearchPersonToAssingnment = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState(users);
  const { computerInfo, setComputerInfo } = useComputer();
  const { auth } = useAuth();

  const updateFilter = useCallback(
    (data) => {
      setFilter(data);
    },
    [setFilter]
  );

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
    if (!search) {
      updateFilter(users);
      return;
    }

    const filteredUsers = users.filter((user) =>
      Object.values(user).some((value) =>
        String(value).toLowerCase().includes(search.toLocaleLowerCase())
      )
    );
    updateFilter(filteredUsers);
  }, [search, users, updateFilter]);

  const handleSelectClick = async (item) => {
    const token = localStorage.getItem("token");

    if (!token || !computerInfo || !computerInfo._id) {
      return false;
    }
    const messageUpdate = {
      userId: item._id,
      userName: item.name,
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
    const data = await request.json();

    console.log(data);

    const updatedComputerInfo = {
      ...computerInfo,
      userId: item._id,
      userName: item.name,
    };

    setComputerInfo(updatedComputerInfo);
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
        <table className="table table-striped glass">
          <thead>
            <tr>
              <th className="col">Name</th>
              <th className="col">Position</th>
              <th className="col">Department</th>
            </tr>
          </thead>
          <tbody>
            {filter.map((item) => (
              <tr
                className="glass"
                key={item._id}
                onClick={() => handleSelectClick(item)}
              >
                <td>{item.name}</td>
                <td>{item.position}</td>
                <td>{item.department}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SearchPersonToAssingnment;
