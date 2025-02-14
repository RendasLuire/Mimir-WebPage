import CircularProgress from "@mui/material/CircularProgress";
import "./InventoryDevices.css";
import { useEffect, useState } from "react";
import CardDevice from "../../../Components/device/carDevice/CardDevice";
import Global from "../../../helpers/Global";
import { Pagination } from "@mui/material";
import AddDeviceButton from "../../../Components/device/AddDeviceButton";

const InventoryDevices = () => {
  const [loading, setLoading] = useState(true);
  const [devices, setDevices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const devicesPerPage = 8;
  const filter = "computo";

  const getDevices = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("No se encontró el token de autenticación.");
      }

      const request = await fetch(
        `${
          Global.url
        }device?filter=${filter}&page=${currentPage}&limit=${devicesPerPage}&search=${searchTerm.toLowerCase()}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      if (!request.ok) {
        throw new Error("Error al obtener los datos del servidor.");
      }

      if (request.status === 204) {
        setDevices([]);
        setTotalPages(1);
        setLoading(false);
        return;
      }
      const response = await request.json();

      console.log(response);

      setDevices(response.data);
      setTotalPages(response.pagination.totalPages);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(
        "Error obteniendo la información de los dispositivos:",
        error
      );
    }
  };

  useEffect(() => {
    getDevices();
  }, [currentPage, searchTerm]);

  const handleSearch = (event) => {
    setCurrentPage(1);
    setSearchTerm(event.target.value.trim());
  };

  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div className="container">
      {loading ? (
        <div className="loading-container">
          <CircularProgress />
        </div>
      ) : (
        <div className="container">
          <form className="d-flex mb-4 search-bar">
            <input
              type="search"
              className="form-control me-2"
              placeholder="Buscar Equipo"
              value={searchTerm}
              aria-label="Buscar"
              onChange={handleSearch}
            />
          </form>
          <div>
            {devices.length > 0 ? (
              <>
                <div className="pagination-container">
                  <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handleChangePage}
                  />
                </div>
                <div className="row">
                  {devices.map((device) => (
                    <div
                      key={device._id}
                      className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center"
                    >
                      <CardDevice device={device} />
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="no-devices">
                <AddDeviceButton SN={searchTerm} />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryDevices;
