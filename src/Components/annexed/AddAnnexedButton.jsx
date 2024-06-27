import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";
import useForm from "../../hooks/useForm";
import { CircularProgress } from "@mui/material";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import Alert from "@mui/material/Alert";
import Global from "../../helpers/Global";
import useAnnexed from "../../hooks/useAnnexed";

const AddAnnexedButton = () => {
  const { formState, onInputChange, setFormState } = useForm({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { setUpdate } = useAnnexed();
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
      let itemToSave = { ...formState, user: auth._id };

      const request = await fetch(Global.url + "annexeds/", {
        method: "POST",
        body: JSON.stringify(itemToSave),
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      const response = await request.json();
      setMessage(response.message);
      console.log(response.message);

      if (!request.ok) {
        setLoading(false);
      }
      setMessage("");
      setFormState({
        number: "",
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
        className="modal fade"
        id="AddAnnexedModal"
        aria-labelledby="titleAddAnnexed"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
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
                  <label htmlFor="number" className="form-label">
                    Anexo:
                  </label>
                  <input
                    id="number"
                    name="number"
                    className="form-control"
                    type="text"
                    value={formState.number}
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
