import { Alert, CircularProgress } from "@mui/material";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import useForm from "../../hooks/useForm";
import Global from "../../helpers/Global";
import useAnnexed from "../../hooks/useAnnexed";

const AddDevices = () => {
  const [loading, setLoading] = useState(false);
  const { formState, onInputChange, setFormState } = useForm({});
  const { annexedData, setUpdate } = useAnnexed();
  const [message, setMessage] = useState("");
  const { auth } = useAuth();

  const handleSaveClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!annexedData._id) {
      setLoading(false);
      return;
    }

    for (let key in formState) {
      if (!formState[key]) {
        setMessage(`El campo '${key}' es obligatorio.`);
        break;
      }
    }

    if (message) {
      setLoading(false);
      return;
    }

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

      itemToSave.unitValue = parseInt(itemToSave.unitValue);
      itemToSave.tax = parseInt(itemToSave.tax);
      itemToSave.amount = parseInt(itemToSave.amount);

      console.log(itemToSave);

      const request = await fetch(
        Global.url + "annexeds/masive/" + annexedData._id,
        {
          method: "PATCH",
          body: JSON.stringify(itemToSave),
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      const response = await request.json();
      if (!request.ok) {
        setMessage("Error: " + response.message);
        setLoading(false);
      }
      setMessage("");
      setFormState({});
      setLoading(false);
      setUpdate(true);
    } catch (error) {
      console.error("Error saving data:", error);
      setMessage("Error al guardar los datos");
      setLoading(false);
    }
  };

  return (
    <div className="container">
      {loading ? (
        <div className="d-flex justify-content-center m-3">
          <CircularProgress />
        </div>
      ) : (
        <div>
          {message && <Alert>{message}</Alert>}
          <form>
            <div className="mt-1">
              <label htmlFor="brand" className="form-label">
                Marca:
              </label>
              <input
                className="form-control"
                type="text"
                name="brand"
                id="brand"
                onChange={onInputChange}
              />
            </div>
            <div className="mt-1">
              <label htmlFor="model" className="form-label">
                Modelo:
              </label>
              <input
                className="form-control"
                type="text"
                name="model"
                id="model"
                onChange={onInputChange}
              />
            </div>
            <div className="mt-1">
              <label htmlFor="description" className="form-label">
                Descripcion:
              </label>
              <textarea
                className="form-control"
                type="text"
                name="description"
                id="description"
                onChange={onInputChange}
              />
            </div>
            <div className="mt-1">
              <label htmlFor="typeDevice" className="form-label">
                Tipo de Dispositivo:
              </label>
              <select
                id="typeDevice"
                name="typeDevice"
                className="form-select"
                onChange={onInputChange}
              >
                <option value={""}>Selecciona un tipo</option>
                <option value={"Computadora"}>Computadora</option>
                <option value={"Impresora"}>Impresora</option>
                <option value={"Monitor"}>Monitor</option>
              </select>
            </div>
            <div className="mt-1">
              <label htmlFor="unitValue" className="form-label">
                Valor Unitario:
              </label>
              <div className="input-group">
                <span className="input-group-text">$</span>
                <input
                  className="form-control"
                  type="text"
                  name="unitValue"
                  id="unitValue"
                  onChange={onInputChange}
                />
              </div>
            </div>
            <div className="mt-1">
              <label htmlFor="tax" className="form-label">
                Iva:
              </label>
              <div className="input-group">
                <span className="input-group-text">$</span>
                <input
                  className="form-control"
                  type="text"
                  name="tax"
                  id="tax"
                  onChange={onInputChange}
                />
              </div>
            </div>
            <div className="mt-1">
              <label htmlFor="amount" className="form-label">
                Monto:
              </label>
              <div className="input-group">
                <span className="input-group-text">$</span>
                <input
                  className="form-control"
                  type="text"
                  name="amount"
                  id="amount"
                  onChange={onInputChange}
                />
              </div>
            </div>
            <div className="mt-1">
              <label htmlFor="serialNumber" className="form-label">
                Numeros de serie:
              </label>
              <textarea
                className="form-control"
                type="text"
                name="serialNumber"
                id="serialNumber"
                onChange={onInputChange}
              />
            </div>
            <div className="d-flex justify-content-center m-3 container">
              <button
                className="btn btn-success"
                disabled={loading}
                onClick={handleSaveClick}
              >
                Agregar
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddDevices;
