import { useEffect, useState } from "react";
import { Pagination } from "@mui/material";
import "./DetailsDeviceCard.css";
import { API } from "../../../utils/Urls";
import SmallDeviceCard from "../SmallDeviceCard/SmallDeviceCard";

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
        `${API.base}device?filter=${filter}&page=${currentPageAvailable}&limit=${devicesPerPage}&status=${status}`,
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
    if (!selection.newDevice) {
      console.error("No se ha seleccionado un nuevo dispositivo.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No se encontró el token de autenticación.");
        return;
      }

      const messageChangeDevice = { newDevice: selection.newDevice };
      console.log("Enviando datos:", messageChangeDevice);

      const request = await fetch(
        `${API.base}device/changeDevice/${selection.oldDevice}`,
        {
          method: "PATCH",
          body: JSON.stringify(messageChangeDevice),
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      const response = await request.json();
      console.log("Respuesta del servidor:", response);

      onClose();
      setUpdate(true);
    } catch (error) {
      console.error("Error al cambiar de dispositivo:", error);
    }
  };

  const handleChangePageAvailable = (event, value) => {
    setCurrentPageAvailable(value);
  };

  const handleSelectedNew = (deviceId) => {
    setSelection((prevSelection) => ({
      ...prevSelection,
      newDevice: deviceId,
    }));
  };

  useEffect(() => {
    getDevicesAvailables();
    console.log(selection);
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
                <SmallDeviceCard
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
