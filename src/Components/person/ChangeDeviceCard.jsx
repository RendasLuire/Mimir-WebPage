import CachedIcon from "@mui/icons-material/Cached";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import usePerson from "../../hooks/usePerson";
import Global from "../../helpers/Global";
import { useEffect, useState } from "react";

const ChangeDeviceCard = () => {
  const { personData } = usePerson();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const devicesPerPage = 6;
  const [devicesAssigned, setDevicesAssigned] = useState([]);
  const [deviceAvailable, setDeviceAvailable] = useState([]);
  const filter = "dispositivos";
  const status = "disponible";

  const getDevicesAssign = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token || !personData._id) {
        return false;
      }

      const request = await fetch(
        `${Global.url}persons/assigned/${personData._id}?page=${currentPage}&limit=${devicesPerPage}`,
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

      setTotalPages(pagination.totalPages);
      setDevicesAssigned(data);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const getDevicesAvailables = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("No se encontró el token de autenticación.");
      }

      const request = await fetch(
        `${Global.url}device?filter=${filter}&&page=${currentPage}&limit=${devicesPerPage}&status=${status}`,
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

      setDeviceAvailable(response.data);
      setTotalPages(response.pagination.totalPages);
    } catch (error) {
      console.error("Error fetching devices:", error);
    }
  };

  useEffect(() => {
    getDevicesAssign();
    getDevicesAvailables();
  }, []);
  return (
    <div className="card glass">
      <div
        className="card-body text-center"
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#ChangeDeviceModal"
      >
        <CachedIcon sx={{ fontSize: 50 }} />
      </div>
      <div
        className="modal fade"
        id="ChangeDeviceModal"
        tabIndex={"-1"}
        aria-labelledby="ChangeDeviceModal"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content glass">
            <div className="modal-header">
              <h1 className="modal-title fs-5">Cambio de equipos</h1>
              <button
                className="btn-close"
                type="button"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="card-body d-flex align-items-center justify-content-between">
                <div className="card col">
                  <h5 className="card-title text-center">Equipo Actual</h5>
                  <div className="card-body">
                    <table className="table table-hover">
                      <tbody>
                        {devicesAssigned.map((item) => (
                          <tr key={item._id} className="glass">
                            <th>{item.hostname}</th>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="d-flex justify-content-center align-items-center mx-3">
                  <SyncAltIcon sx={{ fontSize: 50 }} />
                </div>
                <div className="card col">
                  <h5 className="card-title text-center">Equipo Nuevo</h5>
                  <div className="card-body">
                    <table className="table table-hover">
                      <tbody>
                        {deviceAvailable.map((item) => (
                          <tr key={item._id} className="glass">
                            <th>{item.hostname}</th>
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
    </div>
  );
};

export default ChangeDeviceCard;
