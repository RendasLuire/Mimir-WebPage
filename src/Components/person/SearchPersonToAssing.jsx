import { useCallback, useEffect, useState } from "react";
import Global from "../../helpers/Global";
import useAuth from "../../hooks/useAuth";
import usePerson from "../../hooks/usePerson";

const SearchPersonToAssingnment = () => {
  const { personInfo, setPersonInfo } = usePerson();
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState(users);
  const [search, setSearch] = useState("");
  const { auth } = useAuth();

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

    const response = await request.json();

    const { persons } = response.data;

    setUsers(persons);
  };

  const updateFilter = useCallback(
    (data) => {
      setFilter(data);
    },
    [setFilter]
  );

  const handleInputChange = (event) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    getPersons();
    if (!search) {
      updateFilter(users);
      return;
    }

    const filteredUsers = users.filter((user) =>
      Object.values(user).some((value) =>
        String(value).toLowerCase().includes(search.toLowerCase())
      )
    );
    updateFilter(filteredUsers);
  }, [updateFilter, users, search]);

  const handleSelectClick = async (item) => {
    const token = localStorage.getItem("token");

    if (!token) {
      return false;
    }

    const messageUpdate = {
      manager: {
        managerId: item._id,
        managerName: item.name,
      },
      userTI: auth._id,
    };

    console.log(messageUpdate);

    const request = await fetch(
      Global.url + "persons/update/" + personInfo._id,
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

    const updatedPersonInfo = {
      ...personInfo,
      manager: {
        managerId: item._id,
        managerName: item.name,
      },
    };

    setPersonInfo(updatedPersonInfo);
  };

  return (
    <div className="m-3">
      <h5>Asigna el equipo</h5>
      <div className="m-3">
        <input
          type="text"
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
              <th className="col">Nombre</th>
              <th className="col">Posicion</th>
              <th className="col">Departamento</th>
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
