import { useEffect, useState } from "react";
import Global from "../../helpers/Global";
import useAuth from "../../hooks/useAuth";
import usePerson from "../../hooks/usePerson";
import CircularProgress from "@mui/material/CircularProgress";
import Pagination from "@mui/material/Pagination";

const SearchPersonToAssingnment = () => {
  const { personData, setUpdate } = usePerson();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const devicesPerPage = 5;
  const { auth } = useAuth();

  const getPersons = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      return false;
    }

    const request = await fetch(
      `${Global.url}persons?page=${currentPage}&limit=${devicesPerPage}&search=${searchTerm}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );

    const response = await request.json();

    const { data, pagination } = response;

    const filteredData = data.filter((person) => person._id !== personData._id);

    setUsers(filteredData);
    setTotalPages(pagination.totalPages);
    setLoading(false);
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    getPersons();
  }, [users, currentPage, searchTerm]);

  const handleSelectClick = async (item) => {
    const token = localStorage.getItem("token");

    if (!token) {
      return false;
    }

    const messageUpdate = {
      manager: item._id,
      userTI: auth._id,
    };

    const request = await fetch(
      Global.url + "persons/assing/" + personData._id,
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
  };

  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div className="m-3">
      {users.length > 0 ? (
        <>
          <h5>Asigna el usuario</h5>
          <div className="m-3">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar usuario"
              value={searchTerm}
              onChange={handleInputChange}
            />
          </div>
          <div className="m-3">
            <>
              {loading ? (
                <>
                  <div className="d-flex justify-content-center">
                    <CircularProgress />
                  </div>
                </>
              ) : (
                <>
                  <div className="d-flex justify-content-center mt-3">
                    <Pagination
                      count={totalPages}
                      page={currentPage}
                      variant="outlined"
                      color="primary"
                      onChange={handleChangePage}
                    />
                  </div>
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
                  <div className="d-flex justify-content-center mt-3">
                    <Pagination
                      count={totalPages}
                      page={currentPage}
                      variant="outlined"
                      color="primary"
                      onChange={handleChangePage}
                    />
                  </div>
                </>
              )}
            </>
          </div>
        </>
      ) : (
        <div className="d-flex justify-content-center mt-3">
          <label>No hay personas que mostrar.</label>
        </div>
      )}
    </div>
  );
};

export default SearchPersonToAssingnment;
