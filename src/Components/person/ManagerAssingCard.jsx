import PersonIcon from "@mui/icons-material/Person";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import usePerson from "../../hooks/usePerson";
import { useEffect, useState } from "react";
import { Pagination } from "@mui/material";
import Global from "../../helpers/Global";
import useAuth from "../../hooks/useAuth";
import { capitalizeFirstLetterOfEachWord } from "../../helpers/Tools";

const ManagerAssingCard = () => {
  const { personData, setUpdate } = usePerson({});
  const [persons, setPersons] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const personsPerPage = 5;
  const { auth } = useAuth();

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
        `${Global.url}persons?page=${currentPage}&limit=${personsPerPage}&search=${search}`,
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

      const filteredData = data.filter(
        (person) => person._id !== personData._id
      );

      setPersons(filteredData);
      setTotalPages(pagination.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectClick = async (item) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return false;
      }

      const messageUpdate = {
        manager: item._id,
        user: auth._id,
      };

      const request = await fetch(
        `${Global.url}persons/assing/${personData._id}`,
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
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPerson();
  }, [personData, search, currentPage]);

  return (
    <div className="card glass">
      <div
        className="card-body d-flex justify-content-between align-items-center"
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#selectManager"
      >
        <div className="col-2">
          <PersonIcon
            className="img-fluid rounded-start"
            sx={{ width: 50, height: 50 }}
          />
        </div>
        <div className="d-flex col flex-column px-2">
          <label className="card-title">
            {personData.manager.name
              ? capitalizeFirstLetterOfEachWord(personData.manager.name)
              : "Sin asignar"}
          </label>
          <p className="card-text">
            <small className="text-body-secondary">Gerente / Director</small>
          </p>
        </div>
      </div>
      <div
        className="modal fade"
        id="selectManager"
        tabIndex="-1"
        aria-labelledby="selectManager"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content glass">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="selectManager">
                Selecciona al Gerente o Director:
              </h1>
              <button
                className="btn-close"
                type="button"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="card m-3 text-center">
                <div className="card-body">
                  <label className="card-text">
                    {personData.manager.name
                      ? capitalizeFirstLetterOfEachWord(personData.manager.name)
                      : "Sin seleccionar"}
                  </label>
                  <p className="card-text">
                    <small className="text-body-secondary">
                      Gerente / Director Actual
                    </small>
                  </p>
                </div>
              </div>
              <div className="m-3">
                <input
                  className="form-control"
                  placeholder="Buscar personas"
                  value={search}
                  onChange={handleInputChange}
                />
              </div>
              <div className="m-3">
                <div className="d-flex justify-content-around mt-3">
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
                      <th className="col">Departamento</th>
                      <th className="col">Posicion</th>
                    </tr>
                  </thead>
                  <tbody>
                    {persons.map((item) => (
                      <tr
                        className="glass"
                        key={item._id}
                        onClick={() => handleSelectClick(item)}
                      >
                        <td>{capitalizeFirstLetterOfEachWord(item.name)}</td>
                        <td>
                          {capitalizeFirstLetterOfEachWord(
                            item.department.name
                          )}
                        </td>
                        <td>
                          {capitalizeFirstLetterOfEachWord(item.position)}
                        </td>
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

export default ManagerAssingCard;
