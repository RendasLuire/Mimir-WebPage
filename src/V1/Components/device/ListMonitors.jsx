import { useEffect, useState } from "react";
import useDevice from "../../hooks/useDevice";
import Global from "../../helpers/Global";
import useAuth from "../../hooks/useAuth";
import { CircularProgress, Pagination } from "@mui/material";

const ListMonitors = () => {
  const [listMonitors, setListMonitors] = useState([]);
  const { deviceData, setUpdate } = useDevice();
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const devicesPerPage = 5;
  const { auth } = useAuth();

  const getMonitors = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return false;
      }

      const request = await fetch(
        `${Global.url}device?typeDevice=Monitor&page=${currentPage}&limit=${devicesPerPage}&search=${searchTerm}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      const response = await request.json();
      const { data, pagination } = response;

      const filteredMonitors = data.filter(
        (monitor) =>
          monitor.status == "Activo" && monitor.user.id == "Sin asignar"
      );

      setListMonitors(filteredMonitors);
      setTotalPages(pagination.totalPages);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleSelectClick = async (item) => {
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const { user } = deviceData;

      if (!token) {
        return false;
      }

      const messageUpdateComputer = {
        monitor: {
          id: item._id,
          serialNumber: item.serialNumber,
        },
        userTI: auth._id,
      };

      const messageUpdateMonitor = {
        user: {
          id: user.id,
          name: user.name,
        },
        userTI: auth._id,
      };

      const requestComputer = await fetch(
        Global.url + "device/" + deviceData._id,
        {
          method: "PATCH",
          body: JSON.stringify(messageUpdateComputer),
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      const requestMonitor = await fetch(Global.url + "device/" + item._id, {
        method: "PATCH",
        body: JSON.stringify(messageUpdateMonitor),
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      await requestComputer.json();
      await requestMonitor.json();

      setUpdate(true);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    getMonitors();
  }, [deviceData, currentPage, searchTerm]);

  return (
    <div className="m-3">
      <div className="col-6">
        <input
          className="form-control my-3"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Search"
        />
      </div>
      {loading ? (
        <CircularProgress />
      ) : listMonitors.length > 0 ? (
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
          <table className="table table-striped glass">
            <thead>
              <tr>
                <th className="col">Numero de Serie</th>
                <th className="col">Marca</th>
                <th className="col">Modelo</th>
              </tr>
            </thead>
            <tbody>
              {listMonitors.map((item) => (
                <tr
                  className="glass"
                  key={item._id}
                  onClick={() => handleSelectClick(item)}
                >
                  <td>{item.serialNumber}</td>
                  <td>{item.brand}</td>
                  <td>{item.model}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
        <div className="d-flex justify-content-center mt-3">
          <label>No hay monitores disponibles.</label>
        </div>
      )}
    </div>
  );
};

export default ListMonitors;
