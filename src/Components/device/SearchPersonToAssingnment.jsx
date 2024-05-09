import { useCallback, useEffect, useState } from "react";
import Global from "../../helpers/Global";
import useDevice from "../../hooks/useDevice";
import useAuth from "../../hooks/useAuth";
import { CircularProgress } from "@mui/material";

const SearchPersonToAssingnment = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState(users);
  const { deviceData, setUpdate } = useDevice();
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

      const request = await fetch(Global.url + "persons/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      const response = await request.json();

      const { data } = response;

      setUsers(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPersons();
  }, [deviceData, updateFilter]);

  const handleSelectClick = async (item) => {
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      if (!token || !deviceData || !deviceData._id) {
        return false;
      }

      const messageUpdate = {
        user: item._id,
        userTI: auth._id,
      };

      const request = await fetch(
        Global.url + "device/assing/" + deviceData._id,
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

      setUpdate(true);
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
      ) : users.length > 0 ? (
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
                {users.map((item) => (
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
      ) : (
        <>
          <div className="d-flex justify-content-center mt-3">
            <label className="label">No hay usuarios registrados.</label>
          </div>
        </>
      )}
    </div>
  );
};

export default SearchPersonToAssingnment;
