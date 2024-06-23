import { useEffect, useState } from "react";
import Global from "../../helpers/Global";
import AddDeviceButton from "../../Components/device/AddDeviceButton";
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
  const devicesPerPage = 12;

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

      const filteredData = data.filter(
        (device) => device.typeDevice !== "monitor"
      );

      setDevices(filteredData);
      setTotalPages(pagination.totalPages);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDevices();
  }, [update, currentPage, searchTerm]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div className="m-3">
      {loading ? (
        <div className="d-flex justify-content-center">
          <CircularProgress />
        </div>
      ) : (
        <>
          <div className="d-flex justify-content-center align-items-center m-3 glass">
            <div className="col-6">
              <input
                className="form-control m-3"
                value={searchTerm}
                onChange={handleInputChange}
                placeholder="Search"
              />
            </div>
            <div className="my-3">
              <AddDeviceButton setUpdate={setUpdate} />
            </div>
          </div>
          <div className="glass m-3">
            <>
              {devices.length > 0 ? (
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
                  <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 mx-3">
                    {devices.map((item) => (
                      <div key={item._id} className="col-12 col-md-4 col-lg-2">
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
              ) : (
                <>
                  <div className="d-flex justify-content-center m-3">
                    <label className="label">No hay dispositivos.</label>
                  </div>
                </>
              )}
            </>
          </div>
        </>
      )}
    </div>
  );
};

export default InventoryDevices;
