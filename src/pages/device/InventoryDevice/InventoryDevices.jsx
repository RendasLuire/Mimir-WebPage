import { useEffect, useState } from "react";
import Global from "../../../helpers/Global";
import AddDeviceButton from "../../../Components/device/AddDeviceButton";
import CardDevice from "../../../Components/device/carDevice/CardDevice";
import CircularProgress from "@mui/material/CircularProgress";
import Pagination from "@mui/material/Pagination";
import "./InventoryDevice.css";

const InventoryDevices = () => {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [update, setUpdate] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const devicesPerPage = 10;
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
        }device?filter=${filter}&page=${currentPage}&limit=${devicesPerPage}&search=${searchTerm.toLocaleLowerCase()}`,
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

      const response = await request.json();

      setDevices(response.data);
      setTotalPages(response.pagination.totalPages);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching devices:", error);
    }
  };

  useEffect(() => {
    getDevices();
  }, [update, currentPage, searchTerm]);

  const handleInputChange = (event) => {
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
        <>
          <div className="filter-bar glass">
            <input
              className="search-input"
              value={searchTerm}
              onChange={handleInputChange}
              placeholder="Buscar"
            />
            <AddDeviceButton setUpdate={setUpdate} />
          </div>
          <div className="pagination-container glass">
            <Pagination
              count={totalPages}
              page={currentPage}
              variant="outlined"
              color="primary"
              onChange={handleChangePage}
            />
          </div>
          <div className="device-card-container">
            {devices.length > 0 ? (
              devices
                .slice(0)
                .reverse()
                .map((item) => <CardDevice key={item._id} device={item} />)
            ) : (
              <div className="no-devices">
                <label>No hay dispositivos.</label>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default InventoryDevices;
