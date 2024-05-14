import { useState } from "react";
import useForm from "../../hooks/useForm";
import Alert from "@mui/material/Alert";
import useAuth from "../../hooks/useAuth";
import Global from "../../helpers/Global";
import { CircularProgress } from "@mui/material";
import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";

const ButtonAddPerson = ({ setUpdate }) => {
  const { formState, onInputChange, setFormState } = useForm({});
  const [message, setMessage] = useState();
  const [loading, setLoading] = useState(false);
  const { auth } = useAuth();

  const saveData = async (e) => {
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

      const request = await fetch(Global.url + "persons/", {
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
          name: "",
          department: "",
          position: "",
        });
        setLoading(false);
        console.log("Voy a cambiar el estado a true");
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
          data-bs-target="#AddPersonModal"
          className="btn btn-success"
        >
          <ControlPointOutlinedIcon />
        </button>
      </div>
      <div
        className="modal fade"
        id="AddPersonModal"
        aria-labelledby="titleAddPerson"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="titleAssPerson">
                Agregar Usuario
              </h1>
              <button
                className="btn-close"
                type="button"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={saveData}>
              <div className="modal-body">
                <div className="mb-1">
                  <div>
                    {message ? <Alert severity="error">{message}</Alert> : ""}
                  </div>
                  <label className="form-label" htmlFor="name">
                    Nombre:
                  </label>
                  <input
                    id="name"
                    name="name"
                    className="form-control"
                    type="text"
                    value={formState.name}
                    onChange={onInputChange}
                  />
                </div>
                <div className="mb-1">
                  <label className="form-label" htmlFor="department">
                    Departamento:
                  </label>
                  <input
                    id="department"
                    name="department"
                    className="form-control"
                    type="text"
                    value={formState.department}
                    onChange={onInputChange}
                  />
                </div>
                <div className="mb-1">
                  <label className="form-label" htmlFor="position">
                    Posicion:
                  </label>
                  <input
                    id="position"
                    name="position"
                    className="form-control"
                    type="text"
                    value={formState.position}
                    onChange={onInputChange}
                  />
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
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ButtonAddPerson;
