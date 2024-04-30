import { useEffect, useState } from "react";
import Global from "../../helpers/Global";
import CardPersons from "../../Components/person/CardPersons";
import ButtonAddPerson from "../../Components/person/ButtonAddPerson";
import { CircularProgress } from "@mui/material";
import Pagination from "@mui/material/Pagination";

const ListAllPersons = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [update, setUpdate] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const devicesPerPage = 10;

  const getUsers = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return false;
      }

      const request = await fetch(
        `${Global.url}persons?page=${currentPage}&limit=${devicesPerPage}&search=${searchTerm}`,
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

      setUsers(data);
      setTotalPages(pagination.totalPages);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, [update, currentPage, searchTerm]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div className="container glass mt-3">
      {loading ? (
        <div className="d-flex justify-content-center">
          <CircularProgress />
        </div>
      ) : (
        <>
          <div className="d-flex justify-content-center align-items-center my-3 glass">
            <div className="col-6">
              <input
                className="form-control m-3"
                value={searchTerm}
                onChange={handleInputChange}
                placeholder="Search"
              />
            </div>
            <div className="m-3">
              <ButtonAddPerson setUpdate={setUpdate} />
            </div>
          </div>
          <div className="constainer glass mt-3 mb-3">
            <>
              {users.length < 1 ? (
                <>
                  <div className="d-flex justify-content-center m-3">
                    <label className="label">No hay usuarios.</label>
                  </div>
                </>
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
                  <div className="row row-cols-1 row-clos-sm-2 row-cols-md-3 row-cols-lg-5 g-4">
                    {users.map((item) => (
                      <div className="col" key={item._id}>
                        <CardPersons user={item} />
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
            </>
          </div>
        </>
      )}
    </div>
  );
};

export default ListAllPersons;
