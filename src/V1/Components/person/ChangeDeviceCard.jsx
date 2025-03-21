import CachedIcon from "@mui/icons-material/Cached";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import usePerson from "../../hooks/usePerson";
import Global from "../../helpers/Global";
import { useEffect, useState } from "react";
import CardDeviceSmall from "../device/CardDeviceSmall";
import { Pagination } from "@mui/material";

const ChangeDeviceCard = () => {
  const { personData, setUpdate } = usePerson();
  const [currentPageAssign, setCurrentPageAssign] = useState(1);
  const [currentPageAvailable, setCurrentPageAvailable] = useState(1);
  const [totalPagesAssign, setTotalPagesAssign] = useState(1);
  const [totalPagesAvailables, setTotalPagesAvailables] = useState(1);
  const devicesPerPage = 3;
  const [buttonState, setButtonState] = useState(true);
  const [devicesAssigned, setDevicesAssigned] = useState([]);
  const [deviceAvailable, setDeviceAvailable] = useState([]);
  const [selection, setSelection] = useState({
    oldDevice: "",
    newDevice: "",
  });
  const filter = "dispositivos";
  const status = "disponible";

  const getDevicesAssign = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token || !personData._id) {
        return false;
      }

      const request = await fetch(
        `${Global.url}persons/assigned/${personData._id}?page=${currentPageAssign}&limit=${devicesPerPage}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      console.log(request);
      const response = await request.json();
      const { data, pagination } = response;

      setTotalPagesAssign(pagination.totalPages);
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

  const handleSelectedOld = async (deviceId) => {
    setSelection({ ...selection, oldDevice: deviceId });
  };

  const handleSelectedNew = async (deviceId) => {
    setSelection({ ...selection, newDevice: deviceId });
  };

  const handleChangePageAssign = (event, value) => {
    setCurrentPageAssign(value);
  };

  const handleChangePageAvailable = (event, value) => {
    setCurrentPageAvailable(value);
  };

  const isButtonAvailable = () => {
    if (selection.oldDevice !== "" && selection.newDevice !== "") {
      console.log("hola");
      setButtonState(false);
    }
  };

  const handleChangeDevice = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token || !personData._id) {
        return false;
      }

      const messageChangeDevice = {
        idOldDevice: selection.oldDevice,
        idNewDevice: selection.newDevice,
        idPerson: personData._id,
      };

      const request = await fetch(`${Global.url}persons/changeDevice`, {
        method: "PATCH",
        body: JSON.stringify(messageChangeDevice),
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      await request.json();

      setUpdate(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDevicesAssign();
    getDevicesAvailables();
    isButtonAvailable();
  }, [selection, currentPageAssign, currentPageAvailable]);

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
                    <div className=" align-self-center text-center align-items-center">
                      <Pagination
                        count={totalPagesAssign}
                        page={currentPageAssign}
                        variant="outlined"
                        color="primary"
                        onChange={handleChangePageAssign}
                      />
                    </div>
                    <div>
                      {devicesAssigned.map((item) => (
                        <CardDeviceSmall
                          device={item}
                          key={item._id}
                          isSelected={selection.oldDevice === item._id}
                          onClick={() => handleSelectedOld(item._id)}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-center align-items-center mx-3">
                  <SyncAltIcon sx={{ fontSize: 50 }} />
                </div>
                <div className="card col">
                  <h5 className="card-title text-center">Equipo Nuevo</h5>
                  <div className="card-body">
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
                </div>
              </div>
              <div className="d-flex justify-content-center align-items-center mx-3">
                <button
                  className="btn btn-success btn-lg"
                  disabled={buttonState}
                  onClick={handleChangeDevice}
                >
                  Cambiar equipo
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeDeviceCard;
