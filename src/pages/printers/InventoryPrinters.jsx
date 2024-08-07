import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import Global from "../../helpers/Global";
import CardDevice from "../../Components/device/CardDevice";
import AddDeviceButton from "../../Components/device/AddDeviceButton";

const InventoryPrinters = () => {
  const [printers, setPrinters] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [update, setUpdate] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const printersPerPages = 12;

  const getPrintes = async () => {
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
    getPrintes();
  }, [update, currentPage, searchTerm]);

  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="m-3">
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
          <AddDeviceButton setUpdate={setUpdate} option={"impresora"} />
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
              onChange={handleChangePage}
            />
          </div>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-6 g-4 mx-3">
            {printers.map((item) => (
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
              onChange={handleChangePage}
            />
          </div>
        </>
      </div>
    </div>
  );
};

export default InventoryPrinters;
