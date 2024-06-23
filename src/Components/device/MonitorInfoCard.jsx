import MonitorIcon from "@mui/icons-material/Monitor";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import useDevice from "../../hooks/useDevice";
import { useEffect, useState } from "react";
import { Pagination } from "@mui/material";
import Global from "../../helpers/Global";

const MonitorInfoCard = () => {
  const { deviceData, setUpdate } = useDevice();
  const [monitors, setMonitors] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const monitorsPerPage = 5;
  const typeDevice = "monitor";

  const handleInputChange = (event) => {
    setSearch(event.target.value);
  };

  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };

  const getMonitors = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return false;
      }

      const request = await fetch(
        `${Global.url}devices?page=${currentPage}&limit=${monitorsPerPage}&search=${search}&typeDevice=${typeDevice}`,
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

      setMonitors(data);
      setTotalPages(pagination.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMonitors();
  }, [currentPage, search, deviceData]);

  return (
    <div className="card glass ">
      <div className="card-body d-flex justify-content-between align-items-center">
        <div className="col-2">
          <MonitorIcon
            className="img-fluid rounded-start"
            sx={{ width: 50, height: 50 }}
          />
        </div>
        <div className="d-flex col flex-column px-2">
          <label className="card-title">Monitor</label>
          <p className="card-text">
            <small className="text-body-secondary">Monitor</small>
          </p>
        </div>
        <div className="col">
          <button
            className="btn"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#selectMonitor"
          >
            <BorderColorIcon />
          </button>
        </div>
        <div
          className="modal fade"
          id="selectMonitor"
          tabIndex={"-1"}
          aria-labelledby="selectMonitor"
          aria-hidden={"true"}
        >
          <div className="modal-dialog">
            <div className="modal-content glass">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="selectMonitor">
                  Selecciona un monitor
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="card m-3 text-center">
                  <div className="card-body">
                    <label className="card-text">
                      {deviceData.monitor.serialNumber
                        ? deviceData.monitor.serialNumber
                        : "Sin monitor"}
                    </label>
                    <p className="card-text">
                      <small className="text-body-secondary">
                        Monitor actual
                      </small>
                    </p>
                  </div>
                </div>
                <div className="m-3">
                  <input
                    className="form-control"
                    placeholder="Buscar monitor"
                    value={search}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="m-3">
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
                        <th className="col">Marca</th>
                        <th className="col">Modelo</th>
                        <th className="col">Numero de serie</th>
                      </tr>
                    </thead>
                    <tbody>
                      {monitors.map((item) => (
                        <tr className="glass" key={item._id}>
                          <td>{item.brand}</td>
                          <td>{item.model}</td>
                          <td>{item.serialNumber}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonitorInfoCard;
