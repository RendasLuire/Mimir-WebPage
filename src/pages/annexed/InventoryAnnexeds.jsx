import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Pagination from "@mui/material/Pagination";
import Global from "../../helpers/Global";
import CardAnnexed from "../../Components/annexed/CardAnnexed";
import AddAnnexedButton from "../../Components/annexed/AddAnnexedButton";

const InventoryAnnexeds = () => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [annexeds, setAnnexeds] = useState([]);
  const [update, setUpdate] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const devicesPerPage = 10;

  const getAnnexeds = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No se encontró el token de autenticación.");
      }

      const request = await fetch(
        `${Global.url}annexeds?page=${currentPage}&limit=${devicesPerPage}&search=${searchTerm}`,
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

      setAnnexeds(data);
      setTotalPages(pagination.totalPages);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.evalue);
  };

  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    getAnnexeds();
    setUpdate(false);
  }, [searchTerm, currentPage, update]);
  return (
    <div className="m-3">
      {loading ? (
        <div className="d-flex justify-content-center m-3">
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
              <AddAnnexedButton setUpdate={setUpdate} />
            </div>
          </div>
          <div className="glass m-3 h-100 w-100">
            {annexeds.length > 0 ? (
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
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-6 g-4 mx-3">
                  {annexeds.map((item) => (
                    <div key={item._id} className="col">
                      <CardAnnexed annexed={item} />
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
                  <label className="label">No hay anexos.</label>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default InventoryAnnexeds;
