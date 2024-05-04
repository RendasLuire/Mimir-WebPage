import { CircularProgress } from "@mui/material";
import { useState } from "react";

const AddDevices = () => {
  const [loading, setLoading] = useState(false);
  //TODO Agregar logica para agregar dispositivos al anexo.
  return (
    <div className="container">
      {loading ? (
        <div className="d-flex justify-content-center m-3">
          <CircularProgress />
        </div>
      ) : (
        <div>
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
              />
            </div>
            <div className="mt-1">
              <label htmlFor="typeDevice" className="form-label">
                Tipo de Dispositivo:
              </label>
              <select id="typeDevice" name="typeDevice" className="form-select">
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
              />
            </div>
            <div className="d-flex justify-content-center m-3 container">
              <button className="btn btn-success">Agregar</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddDevices;
