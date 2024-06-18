import BorderColorIcon from "@mui/icons-material/BorderColor";
import useDevice from "../../hooks/useDevice";
import { useEffect, useState } from "react";
import { CircularProgress, Pagination } from "@mui/material";
import Global from "../../helpers/Global";

const PersonAssingCard = () => {
  const { deviceData } = useDevice({});
  const [persons, setPersons] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const usersPerPage = 5;

  const handleInputChange = (event) => {
    setSearch(event.target.value);
  };

  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };

  const getPerson = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return false;
      }

      const request = await fetch(
        `${Global.url}persons?page=${currentPage}&limit=${usersPerPage}&search=${search}`,
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

      setPersons(data);
      setTotalPages(pagination.totalPages);
      console.log(persons);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPerson();
  }, [deviceData, search]);

  return (
    <div className="card-body glass d-flex justify-content-between align-items-center">
      <div className="d-flex flex-column px-2">
        <label className="card-title">{deviceData.person.name}</label>
        <p className="card-text">
          <small className="text-body-secondary">person</small>
        </p>
      </div>
      <button
        className="btn"
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#selectPerson"
      >
        <BorderColorIcon />
      </button>
      <div
        className="modal fade"
        id="selectPerson"
        tabIndex={"-1"}
        aria-labelledby="selectPerson"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content glass">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="selectPerson">
                Selecciona a la persona para asignar:
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="m-3">
                <input
                  className="form-control"
                  placeholder="Buscar usuario"
                  value={search}
                  onChange={handleInputChange}
                />
              </div>
              <div className="m-3">
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
                    </tr>
                  </thead>
                  <tbody>
                    {persons.map((item) => (
                      <tr className="glass" key={item._id}>
                        <td>{item.name}</td>
                        <td>{item.position}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonAssingCard;