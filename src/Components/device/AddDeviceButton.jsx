import { useState } from "react";
import Global from "../../helpers/Global";
import useAuth from "../../hooks/useAuth";
import useForm from "../../hooks/useForm";
import Alert from "@mui/material/Alert";
import { CircularProgress } from "@mui/material";
import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";

const AddDeviceButton = ({ setUpdate }) => {
  const { formState, onInputChange, setFormState } = useForm({
    brand: "",
    model: "",
    serialNumber: "",
    typeDevice: "",
  });
  const [message, setMessage] = useState();
  const [loading, setLoading] = useState(false);
  const { auth } = useAuth();

  const handleSaveData = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      const capitalizeField = (value) => {
        return value.replace(/\b\w/g, (char) => char.toUpperCase());
      };

      const capitalizedFormState = Object.fromEntries(
        Object.entries(formState).map(([key, value]) => [
          key,
          typeof value === "string" ? capitalizeField(value) : value,
        ])
      );

      let itemToSave = { ...capitalizedFormState, userTI: auth._id };

      const request = await fetch(Global.url + "device/", {
        method: "POST",
        body: JSON.stringify(itemToSave),
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      const response = await request.json();

      if (request.status == 201) {
        setMessage("");
        setFormState({
          brand: "",
          model: "",
          serialNumber: "",
          typeDevice: "",
        });
        setLoading(false);
        setUpdate(true);
      } else {
        const errorData = response;
        setMessage(errorData.message);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error saving data:", error);
      setMessage("Error al guardar los datos");
      setLoading(false);
    }
  };

  return (
    <>
      <div className="my-3 container">
        <button
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#AddComputerModal"
          className="btn btn-success"
        >
          <ControlPointOutlinedIcon />
        </button>
      </div>

      <div
        className="modal fade"
        id="AddComputerModal"
        aria-labelledby="titleAddComputer"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="titleAddComputer">
                Agregar Item
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={handleSaveData}>
              <div className="modal-body">
                <div className="mb-1">
                  <div>
                    {message ? <Alert severity="error">{message}</Alert> : ""}
                  </div>
                  <label htmlFor="brand" className="form-label">
                    Marca:
                  </label>
                  <input
                    id="brand"
                    name="brand"
                    className="form-control"
                    type="text"
                    value={formState.brand}
                    onChange={onInputChange}
                  />
                </div>
                <div className="mb-1">
                  <label htmlFor="model" className="form-label">
                    Modelo:
                  </label>
                  <input
                    id="model"
                    name="model"
                    className="form-control"
                    type="text"
                    value={formState.model}
                    onChange={onInputChange}
                  />
                </div>
                <div className="mb-1">
                  <label htmlFor="serialNumber" className="form-label">
                    Numero de Serie:
                  </label>
                  <input
                    id="serialNumber"
                    name="serialNumber"
                    className="form-control"
                    type="text"
                    value={formState.serialNumber}
                    onChange={onInputChange}
                  />
                </div>
                <div className="mb-1">
                  <label htmlFor="type" className="form-label">
                    Tipo:
                  </label>
                  <select
                    id="typeDevice"
                    name="typeDevice"
                    onChange={onInputChange}
                    className="form-select"
                    value={formState.typeDevice}
                  >
                    <option value={""}>Selecciona un tipo</option>
                    <option value={"Computadora"}>Computadora</option>
                    <option value={"Impresora"}>Impresora</option>
                    <option value={"Monitor"}>Monitor</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cerrar
                </button>
                <button
                  type="submit"
                  data-bs-dismiss="modal"
                  className="btn btn-primary"
                >
                  {loading ? <CircularProgress /> : "Guardar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddDeviceButton;
