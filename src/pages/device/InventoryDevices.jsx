import { useEffect, useState } from "react";
import Global from "../../helpers/Global";
import ButtonAddDevice from "../../Components/device/ButtonAddDevice";
import CardDevice from "../../Components/device/CardDevice";
import CircularProgress from "@mui/material/CircularProgress";
import Pagination from "@mui/material/Pagination";

const InventoryDevices = () => {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [update, setUpdate] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const devicesPerPage = 10;

  const getDevices = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("No se encontró el token de autenticación.");
      }

      const request = await fetch(
        `${Global.url}device?page=${currentPage}&limit=${devicesPerPage}&search=${searchTerm}`,
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

      const { data, pagination } = response;

      setDevices(data);
      setTotalPages(pagination.totalPages);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDevices(currentPage);
  }, [update, currentPage, searchTerm]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div className="container glass mt-3">
      <div className="d-flex justify-content-center mt-3 mb-3 glass">
        <div className="col-6">
          <input
            className="form-control m-3"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="Search"
          />
        </div>
        <div className="m-3">
          <ButtonAddDevice setUpdate={setUpdate} />
        </div>
      </div>
      <div className="container glass mt-3 mb-3">
        {loading ? (
          <div className="d-flex justify-content-center">
            <CircularProgress />
          </div>
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
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-4">
              {devices.map((item) => (
                <div key={item._id} className="col">
                  <CardDevice device={item} />
                </div>
              ))}
            </div>
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
      </div>
    </div>
  );
};

export default InventoryDevices;
