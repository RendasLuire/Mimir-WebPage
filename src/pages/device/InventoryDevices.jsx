import React, { useEffect, useState } from "react";
import Global from "../../helpers/Global";
import AddDeviceButton from "../../Components/device/AddDeviceButton";
import CardDevice from "../../Components/device/CardDevice";
import FilterBarDevice from "../../Components/device/FilterBarDevice";
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
        }device?filter=${filter}&&page=${currentPage}&limit=${devicesPerPage}&search=${searchTerm.toLocaleLowerCase()}`,
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
    <div className="mx-3">
      {loading ? (
        <div className="d-flex justify-content-center">
          <CircularProgress />
        </div>
      ) : (
        <>
          <div className="d-flex flex-wrap justify-content-center align-items-center my-3 glass p-3">
            <FilterBarDevice />
            <div className="d-flex flex-wrap justify-content-end align-items-center">
              <input
                className="form-control mx-2 my-2"
                value={searchTerm}
                onChange={handleInputChange}
                placeholder="Buscar"
                style={{ maxWidth: "300px" }}
              />
            </div>
            <AddDeviceButton setUpdate={setUpdate} option={"computer"} />
          </div>
          <div className="glass m-3 p-3 w-100">
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
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-6 g-4 mx-3">
                  {devices
                    .slice(0)
                    .reverse()
                    .map((item) => (
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
            ) : (
              <div className="d-flex justify-content-center m-3">
                <label className="label">No hay dispositivos.</label>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default InventoryDevices;
