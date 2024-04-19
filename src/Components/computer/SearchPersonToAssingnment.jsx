import { useCallback, useEffect, useState } from "react";
import Global from "../../helpers/Global";
import useComputer from "../../hooks/useComputer";
import useAuth from "../../hooks/useAuth";
import { CircularProgress } from "@mui/material";

const SearchPersonToAssingnment = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState(users);
  const { computerInfo, setComputerInfo } = useComputer();
  const [loading, setLoading] = useState(true);
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
    try {
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
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
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
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      if (!token || !computerInfo || !computerInfo._id) {
        return false;
      }

      if (computerInfo.monitor.id !== "Sin asignar") {
        const messageUpdateMonitor = {
          user: {
            id: item._id,
            name: item.name,
          },
          userTI: auth._id,
        };

        const requestMonitor = await fetch(
          Global.url + "computers/update/" + computerInfo.monitor.id,
          {
            method: "PATCH",
            body: JSON.stringify(messageUpdateMonitor),
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
          }
        );
        await requestMonitor.json();
      }

      const messageUpdate = {
        user: {
          id: item._id,
          name: item.name,
        },
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
      await request.json();

      const updatedComputerInfo = {
        ...computerInfo,
        user: { id: item._id, name: item.name },
      };

      setComputerInfo(updatedComputerInfo);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div className="m-3">
      {loading ? (
        <div className="d-flex justify-content-center">
          <CircularProgress />
        </div>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default SearchPersonToAssingnment;
