import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";
import useForm from "../../hooks/useForm";
import { CircularProgress } from "@mui/material";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import Alert from "@mui/material/Alert";
import Global from "../../helpers/Global";

const AddAnnexedButton = ({ setUpdate }) => {
  const { formState, onInputChange, setFormState } = useForm({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState();
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
      const request = await fetch(Global.url + "annexeds/", {
        method: "POST",
        body: JSON.stringify(itemToSave),
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      const response = await request.json();
      if (!request.ok) {
        setMessage(response.message);
        setLoading(false);
      }
      setMessage("");
      setFormState({
        annexedNumber: "",
        startDate: "",
        endDate: "",
        bill: "",
      });
      setUpdate(true);
      setLoading(false);
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
          data-bs-target="#AddAnnexedModal"
          className="btn btn-success"
        >
          <ControlPointOutlinedIcon />
        </button>
      </div>
      <div
        className="modal fade container"
        id="AddAnnexedModal"
        aria-labelledby="titleAddAnnexed"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="titleAddAnnexed">
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
                <div className="d-flex justify-content-center">
                  {message && <Alert severity="error">{message}</Alert>}
                </div>
                <div className="mb-1">
                  <label htmlFor="annexedNumber" className="form-label">
                    Anexo:
                  </label>
                  <input
                    id="annexedNumber"
                    name="annexedNumber"
                    className="form-control"
                    type="text"
                    value={formState.annexedNumber}
                    onChange={onInputChange}
                  />
                </div>
                <div className="mb-1">
                  <label htmlFor="startDate" className="form-label">
                    Fecha de Inicio:
                  </label>
                  <input
                    id="startDate"
                    name="startDate"
                    className="form-control"
                    type="date"
                    value={formState.startDate}
                    onChange={onInputChange}
                  />
                </div>
                <div className="mb-1">
                  <label htmlFor="endDate" className="form-label">
                    Fecha de Termino:
                  </label>
                  <input
                    id="endDate"
                    name="endDate"
                    className="form-control"
                    type="date"
                    value={formState.endDate}
                    onChange={onInputChange}
                  />
                </div>
                <div className="mb-1">
                  <label htmlFor="bill" className="form-label">
                    Factura:
                  </label>
                  <input
                    id="bill"
                    name="bill"
                    className="form-control"
                    type="text"
                    value={formState.bill}
                    onChange={onInputChange}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  data-bs-dismiss="modal"
                  className="btn btn-secondary"
                >
                  Cerrar
                </button>
                <button
                  type="submit"
                  data-bs-dismiss="modal"
                  className="btn btn-primary"
                >
                  {loading ? <CircularProgress /> : "Guardar"}{" "}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddAnnexedButton;
