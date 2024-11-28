import { useEffect, useState } from "react";
import Global from "../../helpers/Global";
import CardPersons from "../../Components/person/CardPersons";
import ButtonAddPerson from "../../Components/person/ButtonAddPerson";
import { CircularProgress, Pagination } from "@mui/material";
import "../../styles/Inventorys.css";

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
    setUpdate(false);
  }, [update, currentPage, searchTerm]);

  const handleInputChange = (event) => {
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
        <>
          <div className="filter-bar glass">
            <input
              className="search-input"
              value={searchTerm}
              onChange={handleInputChange}
              placeholder="Buscar"
            />
            <ButtonAddPerson setUpdate={setUpdate} />
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
            {users.length > 0 ? (
              users.map((item) => <CardPersons key={item._id} user={item} />)
            ) : (
              <div className="no-devices">
                <label>No hay usuarios.</label>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ListAllPersons;
