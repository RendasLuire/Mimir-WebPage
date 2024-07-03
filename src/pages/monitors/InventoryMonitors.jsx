import { CircularProgress, Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import Global from "../../helpers/Global";
import CardDevice from "../../Components/device/CardDevice";

const InventoryMonitors = () => {
  const [loading, setLoading] = useState(false);
  const [monitors, setMonitors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const monitorsPerPages = 12;

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
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMonitors();
  }, [currentPage, searchTerm]);

  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
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
                placeholder="Buscar"
                value={searchTerm}
                onChange={handleInputChange}
              />
            </div>
            <div className="my-3">
              <button>boton</button>
            </div>
          </div>
          <div className="glass m-3 h-100 w-100">
            <>
              <div className="d-flex justify-content-center mt-3">
                <Pagination
                  variant="outlined"
                  color="primary"
                  count={totalPages}
                  page={currentPage}
                />
              </div>
              <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-6 g-4 mx-3">
                {monitors.map((item) => (
                  <div key={item._id} className="col">
                    <CardDevice device={item} />
                  </div>
                ))}
              </div>
              <div className="d-flex justify-content-center mt-3">
                <Pagination
                  variant="outlined"
                  color="primary"
                  count={totalPages}
                  page={currentPage}
                />
              </div>
            </>
          </div>
        </>
      )}
    </div>
  );
};

export default InventoryMonitors;
