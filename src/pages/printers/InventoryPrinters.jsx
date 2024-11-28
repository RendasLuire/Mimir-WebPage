import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import Global from "../../helpers/Global";
import CardDevice from "../../Components/device/CardDevice";
import AddDeviceButton from "../../Components/device/AddDeviceButton";
import "../../styles/Inventorys.css";

const InventoryPrinters = () => {
  const [printers, setPrinters] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [update, setUpdate] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const printersPerPages = 10;

  const getPrinters = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.log("No hay token de autenticacion.");
      }

      const request = await fetch(
        `${Global.url}device/printers/?page=${currentPage}&limit=${printersPerPages}&search=${searchTerm}`,
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

      setPrinters(data);
      setTotalPages(pagination.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPrinters();
  }, [update, currentPage, searchTerm]);

  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="container">
      <div className="filter-bar glass">
        <input
          className="search-input"
          placeholder="Buscar"
          value={searchTerm}
          onChange={handleInputChange}
        />
        <AddDeviceButton setUpdate={setUpdate} option={"impresora"} />
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
        {printers.length > 0 ? (
          printers.map((item) => <CardDevice key={item._id} device={item} />)
        ) : (
          <div className="no-devices">
            <label>No hay dispositivos.</label>
          </div>
        )}
      </div>
    </div>
  );
};

export default InventoryPrinters;
