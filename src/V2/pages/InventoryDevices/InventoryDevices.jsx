import { useEffect, useState, useRef } from "react";
import LoadingCard from "../../components/private/LoadingCard/LoadingCard";
import { Pagination } from "@mui/material";
import "./InventoryDevices.css";
import { API } from "../../utils/Urls";
import DeviceCard from "../../components/private/DeviceCard/DeviceCard";

const InventoryDevices = () => {
  const [loading, setLoading] = useState(true);
  const [devices, setDevices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);
  const devicesPerPage = 8;
  const filter = "computo";

  const searchInputRef = useRef(null);

  const getDevices = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("No se encontró el token de autenticación.");
        return;
      }

      const request = await fetch(
        `${
          API.devices
        }?filter=${filter}&page=${currentPage}&limit=${devicesPerPage}&search=${searchTerm.toLowerCase()}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      if (!request.ok) {
        setError("Error al obtener los datos del servidor.");
        return;
      }

      if (request.status === 204) {
        setDevices([]);
        setTotalPages(1);
        setLoading(false);
        return;
      }

      const response = await request.json();
      setDevices(response.data);
      setTotalPages(response.pagination.totalPages);
      setLoading(false);
    } catch (error) {
      setError("Error al obtener los datos del servidor.");
    }
  };

  const handleSearch = (event) => {
    setCurrentPage(1);
    setSearchTerm(event.target.value.trim());
  };

  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    getDevices();
  }, [currentPage, searchTerm]);

  useEffect(() => {
    searchInputRef.current?.focus();
  }, []);

  return (
    <div className="inventoryDevices container">
      {loading ? (
        <LoadingCard />
      ) : (
        <div
          className="container d-flex flex-column justify-content-between"
          style={{ minHeight: "80vh" }}
        >
          <form className="search-bar d-flex mb-4 m-5 w-100">
            <input
              ref={searchInputRef}
              type="search"
              className="form-control me-2 search-input"
              placeholder="Buscar Equipo"
              value={searchTerm}
              aria-label="Buscar"
              onChange={handleSearch}
            />
          </form>
          <small className="text-danger">{error}</small>
          <div className="action-menu d-flex flex-column align-items-center w-50 mx-auto">
            <div className="btn-group w-100 mb-3">
              <button className="btn btn-info" type="button">
                Agregar equipo
              </button>
              <button className="btn btn-info" type="button">
                Agregar monitor
              </button>
              <button className="btn btn-info" type="button">
                Exportar información
              </button>
            </div>
            <div className="pagination-container">
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handleChangePage}
              />
            </div>
          </div>
          <div className="grid-devices flex-grow-1">
            {devices.length < 1 ? (
              <div className="noDevice d-flex justify-content-center align-items-center">
                <h5>No se encontraron equipos</h5>
              </div>
            ) : (
              <div className="row">
                {devices.map((device) => (
                  <div
                    key={device._id}
                    className="col-6 col-md-3 d-flex justify-content-center"
                  >
                    <div className="device-card-wrapper">
                      <DeviceCard device={device} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryDevices;
