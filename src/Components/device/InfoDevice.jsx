import { useEffect, useState } from "react";
import useForm from "../../hooks/useForm";
import Global from "../../helpers/Global";
import useAuth from "../../hooks/useAuth";
import useDevice from "../../hooks/useDevice";
import { CircularProgress } from "@mui/material";

const InfoDevice = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { deviceData, setUpdate, loading } = useDevice();
  const { formState, onInputChange, setFormState } = useForm({
    hostname: deviceData.hostname || "",
    brand: deviceData.brand || "",
    model: deviceData.model || "",
    serialNumber: deviceData.serialNumber || "",
    details: deviceData.details || "",
    status: deviceData.status || "",
    annexed: {
      number: deviceData.annexed.number || "",
    },
    departament: deviceData.departament || "",
    ubication: deviceData.ubication || "",
    ip: deviceData.ip || "",
    bussinesUnit: deviceData.bussinesUnit || "",
    custom: deviceData.custom || "",
    headphones: deviceData.headphones || "",
    adaptVGA: deviceData.adaptVGA || "",
    mouse: deviceData.mouse || "",
    user: deviceData.user || "",
  });
  const { auth } = useAuth();

  const {
    hostname,
    brand,
    model,
    serialNumber,
    details,
    status,
    annexed,
    departament,
    ubication,
    ip,
    bussinesUnit,
    custom,
    headphones,
    adaptVGA,
    mouse,
    user,
  } = formState;

  useEffect(() => {
    setFormState({
      hostname: deviceData.hostname || "",
      brand: deviceData.brand || "",
      model: deviceData.model || "",
      serialNumber: deviceData.serialNumber || "",
      details: deviceData.details || "",
      status: deviceData.status || "",
      annexed: {
        number: deviceData.annexed.number || "",
      },
      departament: deviceData.departament || "",
      ubication: deviceData.ubication || "",
      ip: deviceData.ip || "",
      bussinesUnit: deviceData.bussinesUnit || "",
      custom: deviceData.custom || "",
      headphones: deviceData.headphones || "",
      adaptVGA: deviceData.adaptVGA || "",
      mouse: deviceData.mouse || "",
      user: deviceData.user || "",
    });
  }, [deviceData, setFormState]);

  const handleEditClick = (e) => {
    e.preventDefault();
    setIsEditing(true);
  };

  const handleSaveClick = async (e) => {
    e.preventDefault();

    const isEqual = (a, b) => {
      if (typeof a !== "object" || typeof b !== "object") return a === b;
      if (Object.keys(a).length !== Object.keys(b).length) return false;
      for (const key in a) {
        if (!isEqual(a[key], b[key])) return false;
      }
      return true;
    };

    const changesMade = !isEqual(formState, deviceData);

    if (!changesMade) {
      setIsEditing(false);
      console.log("nada cambio");
      return;
    }

    const token = localStorage.getItem("token");
    const computerToSave = { ...formState, user: auth._id };

    const request = await fetch(Global.url + "device/" + deviceData._id, {
      method: "PATCH",
      body: JSON.stringify(computerToSave),
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    await request.json();

    if (request.ok) {
      setFormState({});
      setUpdate(true);
      setIsEditing(false);
    }
  };

  const handleCustomChange = (newValue) => {
    setFormState((prevState) => ({
      ...prevState,
      custom: newValue,
    }));
  };

  const handleCheckboxChange = (name, value) => {
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      {loading ? (
        <div>
          <CircularProgress />
        </div>
      ) : (
        <div className="container mt-3">
          <div className="glass p-3">
            <div className="mb-1 row">
              <div className="mb-1 col">
                <label className="form-label" htmlFor="hostname">
                  Hostname:
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="hostname"
                  id="hostname"
                  value={hostname}
                  disabled={!isEditing}
                  onChange={onInputChange}
                />
              </div>
              <div className="mb-1 col">
                <label className="form-label" htmlFor="serialNumber">
                  Numero de Serie:
                </label>
                <input
                  className="form-control"
                  name="serialNumber"
                  id="serialNumber"
                  value={serialNumber}
                  disabled={!isEditing}
                  onChange={onInputChange}
                />
              </div>
            </div>
            <div className="mb-1 row">
              <div className="mb-1 col">
                <label className="form-label" htmlFor="brand">
                  Marca:
                </label>
                <input
                  className="form-control"
                  name="brand"
                  id="brand"
                  value={brand}
                  disabled={!isEditing}
                  onChange={onInputChange}
                />
              </div>
              <div className="mb-1 col">
                <label className="form-label" htmlFor="model">
                  Modelo:
                </label>
                <input
                  className="form-control"
                  name="model"
                  id="model"
                  value={model}
                  disabled={!isEditing}
                  onChange={onInputChange}
                />
              </div>
            </div>
            <div className="mb-1">
              <label className="form-label" htmlFor="details">
                Detalles:
              </label>
              <textarea
                className="form-control"
                name="details"
                id="details"
                value={details}
                disabled={!isEditing}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-1 row">
              <div className="mb-1 col">
                <label className="form-label" htmlFor="annexed">
                  Anexo:
                </label>
                <input
                  className="form-control"
                  name="annexed"
                  id="annexed"
                  value={annexed.number}
                  disabled={!isEditing}
                />
              </div>
              <div className="mb-1 col">
                <label className="form-label" htmlFor="status">
                  status:
                </label>
                <select
                  className="form-control"
                  name="status"
                  id="status"
                  value={status}
                  disabled={!isEditing}
                  onChange={onInputChange}
                >
                  <option value={"activo"}>Activo</option>
                  <option value={"guardado"}>Guardado</option>
                </select>
              </div>
            </div>
            <div className="mb-1 row">
              <div className="mb-1 col">
                <label className="form-label" htmlFor="departament">
                  Departamento:
                </label>
                <input
                  className="form-control"
                  name="department"
                  id="department"
                  value={departament.name}
                  disabled
                  onChange={onInputChange}
                />
              </div>
              <div className="mb-1 col">
                <label className="form-label" htmlFor="ubication">
                  Ubicacion:
                </label>
                <input
                  className="form-control"
                  name="ubication"
                  id="ubication"
                  value={ubication}
                  disabled={!isEditing}
                  onChange={onInputChange}
                />
              </div>
              <div className="mb-1 col">
                <label className="form-label" htmlFor="bussinesUnit">
                  Unidad de negocio:
                </label>
                <input
                  className="form-control"
                  name="bussinesUnit"
                  id="bussinesUnit"
                  value={bussinesUnit}
                  disabled={!isEditing}
                  onChange={onInputChange}
                />
              </div>
            </div>
            <div className="mb-1">
              <label className="form-label" htmlFor="ip">
                Ip:
              </label>
              <input
                className="form-control"
                name="ip"
                id="ip"
                value={ip}
                disabled={!isEditing}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-1">
              <div className="form-check form-check-inline">
                <label className="form-check-label" htmlFor="custom">
                  Personalizado
                </label>
                <input
                  className="form-check-input"
                  type="radio"
                  name="custom"
                  id="custom"
                  checked={custom}
                  disabled={!isEditing}
                  onChange={() => handleCustomChange(true)}
                />
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="custom"
                  id="custom"
                  checked={!custom}
                  onChange={() => handleCustomChange(false)}
                  disabled={!isEditing}
                />
                <label className="form-check-label" htmlFor="custom">
                  Compartido
                </label>
              </div>
            </div>
            <div className="mb-1">
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="headphones"
                  name="headphones"
                  checked={headphones}
                  disabled={!isEditing}
                  onChange={(e) =>
                    handleCheckboxChange("headphones", e.target.checked)
                  }
                />
                <label className="form-check-label" htmlFor="headphones">
                  Audifonos
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="adaptVGA"
                  name="adaptVGA"
                  checked={adaptVGA}
                  disabled={!isEditing}
                  onChange={(e) =>
                    handleCheckboxChange("adaptVGA", e.target.checked)
                  }
                />
                <label className="form-check-label" htmlFor="adaptVGA">
                  Adaptador
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="mouse"
                  name="mouse"
                  checked={mouse}
                  disabled={!isEditing}
                  onChange={(e) =>
                    handleCheckboxChange("mouse", e.target.checked)
                  }
                />
                <label className="form-check-label" htmlFor="mouse">
                  Mouse
                </label>
              </div>
            </div>
            <div className="mb-1">
              <label className="form-label" htmlFor="user">
                Usuario:
              </label>
              <input
                className="form-control"
                name="user"
                id="user"
                value={user.name}
                disabled
              />
            </div>
            <div className="text-center">
              {isEditing ? (
                <button className="btn btn-primary" onClick={handleSaveClick}>
                  Guardar
                </button>
              ) : (
                <button className="btn btn-primary" onClick={handleEditClick}>
                  Editar
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default InfoDevice;
