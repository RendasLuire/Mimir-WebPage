import { useEffect, useState } from "react";
import "./InventoryPrinters.css";
import Global from "../../../helpers/Global";
import { CircularProgress, Pagination } from "@mui/material";
import CardPrinter from "../../../Components/printer/CardPrinter/CardPrinter";
import AddDeviceButton from "../../../Components/device/AddDeviceButton";

const InventoryPrinters = () => {
  const [loading, setLoading] = useState(true);
  const [printers, setPrinters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const printersPerPage = 8;
  const filter = "impresora";

  const getPrinters = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("No se encontró el token de autenticación.");
      }

      const request = await fetch(
        `${
          Global.url
        }device?typeDevice=${filter}&page=${currentPage}&limit=${printersPerPage}&search=${searchTerm.toLowerCase()}`,
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
        setPrinters([]);
        setTotalPages(1);
        setLoading(false);
        return;
      }
      const response = await request.json();

      setPrinters(response.data);
      setTotalPages(response.pagination.totalPages);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(
        "Error obteniendo la información de las impresoras:",
        error
      );
    }
  };

  useEffect(() => {
    getPrinters();
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
              placeholder="Buscar Impresora"
              value={searchTerm}
              aria-label="Buscar"
              onChange={handleSearch}
            />
          </form>
          <div>
            {printers.length > 0 ? (
              <>
                <div className="pagination-container">
                  <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handleChangePage}
                  />
                </div>
                <div className="row">
                  {printers.map((printer) => (
                    <div
                      key={printer._id}
                      className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center"
                    >
                      <CardPrinter printer={printer} />
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

export default InventoryPrinters;
