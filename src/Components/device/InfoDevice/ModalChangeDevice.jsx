import { useEffect, useState } from "react";
import Global from "../../../helpers/Global";
import { Pagination } from "@mui/material";
import CardDeviceSmall from "../CardDeviceSmall";
import "./CardInfoDevice.css";

const ModalChangeDevice = ({ isOpen, onClose, currenDevice, setUpdate }) => {
  const [currentPageAvailable, setCurrentPageAvailable] = useState(1);
  const [deviceAvailable, setDeviceAvailable] = useState([]);
  const [totalPagesAvailables, setTotalPagesAvailables] = useState(1);
  const [selection, setSelection] = useState({
    oldDevice: currenDevice,
    newDevice: "",
  });
  const devicesPerPage = 3;
  const filter = "computo";
  const status = "en_resguardo";

  const getDevicesAvailables = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("No se encontró el token de autenticación.");
      }

      const request = await fetch(
        `${Global.url}device?filter=${filter}&&page=${currentPageAvailable}&limit=${devicesPerPage}&status=${status}`,
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
      setTotalPagesAvailables(response.pagination.totalPages);
    } catch (error) {
      console.error("Error fetching devices:", error);
    }
  };

  const handleChangeDevice = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return false;
      }

      const messageChangeDevice = {
        newDevice: selection.newDevice,
      };

      const request = await fetch(
        `${Global.url}device/changeDevice/${selection.oldDevice}`,
        {
          method: "PATCH",
          body: JSON.stringify(messageChangeDevice),
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      await request.json();
      onClose();
      setUpdate(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangePageAvailable = (event, value) => {
    setCurrentPageAvailable(value);
  };

  const handleSelectedNew = async (deviceId) => {
    setSelection({ ...selection, newDevice: deviceId });
  };

  useEffect(() => {
    getDevicesAvailables();
    console.log(selection.newDevice);
  }, [currentPageAvailable, selection]);

  return (
    <div
      className={`container-deviceInfo modal fade ${isOpen ? "show" : ""}`}
      id="modalChangeDevice"
      aria-labelledby="modalChangeDevice"
      aria-hidden={!isOpen}
      style={{ display: isOpen ? "block" : "none" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <label className="modal-title">Selecciona equipo</label>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div>
              <Pagination
                count={totalPagesAvailables}
                page={currentPageAvailable}
                variant="outlined"
                color="primary"
                onChange={handleChangePageAvailable}
              />
            </div>
            <div>
              {deviceAvailable.map((item) => (
                <CardDeviceSmall
                  device={item}
                  key={item._id}
                  isSelected={selection.newDevice === item._id}
                  onClick={() => handleSelectedNew(item._id)}
                />
              ))}
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-danger" onClick={onClose}>
              Cancelar
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleChangeDevice}
            >
              Cambiar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalChangeDevice;
