import MyLocationIcon from "@mui/icons-material/MyLocation";
import useDevice from "../../hooks/useDevice";
import useAuth from "../../hooks/useAuth";
import Global from "../../helpers/Global";
import { Tooltip } from "@mui/material";
import { useEffect, useState } from "react";

const UbicationCard = () => {
  const { deviceData, setUpdate } = useDevice({});
  const { auth } = useAuth();
  const [complex, setComplex] = useState("");
  const [building, setBuilding] = useState("");
  const [ubication, setUbication] = useState("");
  const [storages, setStorages] = useState([]);

  const handleClickSave = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token || !deviceData) {
        return false;
      }

      const messageToSend = { phisicRef: ubication, user: auth._id };

      const request = await fetch(`${Global.url}device/${deviceData._id}`, {
        method: "PATCH",
        body: JSON.stringify(messageToSend),
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      await request.json();

      if (request.ok) {
        setUpdate(true);
      }
    } catch (error) {
      console.log("Error: " + error);
    }
  };

  const getStorages = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token || !deviceData) {
        return false;
      }

      const request = await fetch(`${Global.url}storages/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      const response = await request.json();

      if (request.ok) {
        setStorages(response.data);
      }
    } catch (error) {
      console.log("Error: " + error);
    }
  };

  const loadSelection = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token || !deviceData) {
        return false;
      }

      const messageToSend = { complete: deviceData.phisicRef };

      console.log(messageToSend);

      const request = await fetch(`${Global.url}storages/ubication/`, {
        method: "POST",
        body: JSON.stringify(messageToSend),
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      const response = await request.json();

      if (request.ok) {
        setComplex(response.complexId);
        setBuilding(response.buildingId);
        setUbication(response.ubication.ubicationId);
      }
    } catch (error) {
      console.log("Error: " + error);
    }
  };

  useEffect(() => {
    getStorages();
  }, []);

  useEffect(() => {
    if (storages.length > 0) {
      loadSelection();
    }
  }, [storages]);

  const handleComplexChange = (e) => {
    setComplex(e.target.value);
    setBuilding("");
    setUbication("");
  };

  const handleBuildingChange = (e) => {
    setBuilding(e.target.value);
    setUbication("");
  };

  const handleUbicationChange = (e) => {
    setUbication(e.target.value);
  };

  return (
    <div>
      <Tooltip title={deviceData.phisicRef} arrow>
        <div
          className="card glass"
          style={{ maxWidth: "300px" }}
          data-bs-toggle="modal"
          data-bs-target="#inputUbication"
        >
          <div className="card-body d-flex align-items-center">
            <MyLocationIcon sx={{ width: 40, height: 40 }} className="me-3" />

            <div className="flex-grow-1">
              <label
                className="card-title d-block text-truncate"
                style={{ maxWidth: "150px" }}
              >
                {deviceData.phisicRef}
              </label>
              <p className="card-text">
                <small className="text-body-secondary">Referencia física</small>
              </p>
            </div>
          </div>
        </div>
      </Tooltip>
      <div
        className="modal fade"
        id="inputUbication"
        tabIndex="-1"
        aria-labelledby="inputUbication"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content glass">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="inputUbication">
                Ingresa la ubicación
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <label className="form-label" htmlFor="complex">
                Complejo
              </label>
              <select
                className="form-select"
                aria-label="Selecciona un complejo..."
                name="complex"
                id="complex"
                value={complex}
                onChange={handleComplexChange}
              >
                <option value="">Selecciona un complejo...</option>
                {storages.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.complex}
                  </option>
                ))}
              </select>
              <label className="form-label" htmlFor="building">
                Edificio
              </label>
              <select
                className="form-select"
                id="building"
                name="building"
                value={building}
                onChange={handleBuildingChange}
                disabled={!complex}
              >
                <option value="">Selecciona un edificio...</option>
                {storages
                  .filter((item) => item._id === complex)
                  .flatMap((item) =>
                    item.buildings.map((bld) => (
                      <option key={bld._id} value={bld._id}>
                        {bld.name}
                      </option>
                    ))
                  )}
              </select>

              <label className="form-label" htmlFor="place">
                Ubicación
              </label>
              <select
                className="form-select"
                id="place"
                name="place"
                value={ubication}
                onChange={handleUbicationChange}
                disabled={!building}
              >
                <option value="">Selecciona una ubicación...</option>
                {storages
                  .filter((item) => item._id === complex)
                  .flatMap((item) =>
                    item.buildings
                      .filter((bld) => bld._id === building)
                      .flatMap((bld) =>
                        bld.ubications.map((place) => (
                          <option key={place._id} value={place._id}>
                            {place.ubication}
                          </option>
                        ))
                      )
                  )}
              </select>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                type="button"
                data-bs-dismiss="modal"
              >
                Cerrar
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleClickSave}
              >
                Guardar cambios
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UbicationCard;
