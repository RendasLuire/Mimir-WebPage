import { CircularProgress, Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import Global from "../../helpers/Global";
import CardDevice from "../../Components/device/carDevice/CardDevice";
import AddDeviceButton from "../../Components/device/AddDeviceButton";
import "../../styles/Inventorys.css";

const InventoryMonitors = () => {
  const [loading, setLoading] = useState(true);
  const [monitors, setMonitors] = useState([]);
  const [update, setUpdate] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const monitorsPerPages = 10;

  const getMonitors = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.log("No hay token de autenticacion.");
      }

      const request = await fetch(
        `${Global.url}device/monitors/?page=${currentPage}&limit=${monitorsPerPages}&search=${searchTerm}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      if (!request.ok) {
        console.log("Error en consulta.");
      }

      const response = await request.json();

      const { data, pagination } = response;

      setMonitors(data);
      setTotalPages(pagination.totalPages);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMonitors();
  }, [update, currentPage, searchTerm]);

  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
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
              placeholder="Buscar"
              value={searchTerm}
              onChange={handleInputChange}
            />
            <AddDeviceButton setUpdate={setUpdate} option={"monitor"} />
          </div>
          <div className="pagination-container glass">
            <Pagination
              variant="outlined"
              color="primary"
              count={totalPages}
              page={currentPage}
              onChange={handleChangePage}
            />
          </div>
          <div className="device-card-container">
            {monitors.length > 0 ? (
              monitors.map((item) => (
                <CardDevice key={item._id} device={item} />
              ))
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

export default InventoryMonitors;
