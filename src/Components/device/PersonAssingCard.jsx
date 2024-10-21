import PersonIcon from "@mui/icons-material/Person";
import useDevice from "../../hooks/useDevice";
import { useEffect, useState } from "react";
import { Pagination, Tooltip } from "@mui/material";
import Global from "../../helpers/Global";
import useAuth from "../../hooks/useAuth";
import { capitalizeFirstLetterOfEachWord } from "../../helpers/Tools.js";

const PersonAssingCard = () => {
  const { deviceData, setUpdate } = useDevice({});
  const [persons, setPersons] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const usersPerPage = 5;
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
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnnasingClick = async (item) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return false;
      }

      const messageUpdateDevice = {
        user: auth._id,
      };

      const request = await fetch(
        `${Global.url}device/unassing/${deviceData._id}`,
        {
          method: "PATCH",
          body: JSON.stringify(messageUpdateDevice),
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
  }, [deviceData, search, currentPage]);

  const handleSelectClick = async (item) => {
    try {
      const token = localStorage.getItem("token");

      if (!token || !deviceData || !deviceData._id) {
        return false;
      }

      const messageUpdate = {
        person: item._id,
        user: auth._id,
      };

      const request = await fetch(
        `${Global.url}device/assing/${deviceData._id}`,
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

  return (
    <div>
      <Tooltip
        title={
          deviceData.person.name && deviceData.person.name !== "disponible"
            ? capitalizeFirstLetterOfEachWord(deviceData.person.name)
            : "Sin asignar"
        }
        arrow
      >
        <div
          className="card glass"
          data-bs-toggle="modal"
          data-bs-target="#selectPerson"
        >
          <div className="card-body d-flex align-items-center">
            <PersonIcon className="me-2" sx={{ width: 50, height: 50 }} />
            <div className="flex-grow-1">
              <label
                className="card-title text-truncate d-block"
                style={{ maxWidth: "200px" }}
              >
                {deviceData.person.name &&
                deviceData.person.name !== "disponible"
                  ? capitalizeFirstLetterOfEachWord(deviceData.person.name)
                  : "Sin asignar"}
              </label>
              <p className="card-text">
                <small className="text-body-secondary">Usuario</small>
              </p>
            </div>
          </div>
        </div>
      </Tooltip>

      <div
        className="modal fade"
        id="selectPerson"
        tabIndex="-1"
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
              <div
                className="card m-3 text-center"
                onDoubleClick={handleUnnasingClick}
              >
                <div className="card-body">
                  <label className="card-text">
                    {deviceData.person.name
                      ? capitalizeFirstLetterOfEachWord(deviceData.person.name)
                      : "Sin asignar"}
                  </label>
                  <p className="card-text">
                    <small className="text-body-secondary">
                      Usuario actual
                    </small>
                  </p>
                </div>
              </div>
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
                      <th className="col">Posición</th>
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

export default PersonAssingCard;
