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
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para manejar el modal

  const saveData = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      let itemToSave = { ...formState, user: auth._id };

      const request = await fetch(Global.url + "persons/", {
        method: "POST",
        body: JSON.stringify(itemToSave),
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      const response = await request.json();
      if (request.status === 201) {
        setMessage("");
        setFormState({
          name: "",
          department: "",
          position: "",
        });
        setLoading(false);
        setUpdate(true);
        setIsModalOpen(false); // Cierra el modal después de guardar
      } else {
        setMessage(response.message);
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
          className="btn btn-success"
          onClick={() => setIsModalOpen(true)}
        >
          <ControlPointOutlinedIcon />
        </button>
      </div>

      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1050,
          }}
        >
          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
              width: "90%",
              maxWidth: "500px",
              position: "relative",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid #ccc",
                paddingBottom: "10px",
                marginBottom: "10px",
              }}
            >
              <h1 className="modal-title fs-5">Agregar Usuario</h1>
              <button
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "20px",
                  cursor: "pointer",
                }}
                onClick={() => setIsModalOpen(false)}
              >
                ✖
              </button>
            </div>
            <form onSubmit={saveData}>
              <div>
                {message && <Alert severity="error">{message}</Alert>}
                <label className="form-label" htmlFor="name">
                  Nombre:
                </label>
                <input
                  id="name"
                  name="name"
                  className="form-control"
                  type="text"
                  value={formState.name || ""}
                  onChange={onInputChange}
                />
              </div>
              <div>
                <label className="form-label" htmlFor="department">
                  Departamento:
                </label>
                <input
                  id="department"
                  name="department"
                  className="form-control"
                  type="text"
                  value={formState.department || ""}
                  onChange={onInputChange}
                />
              </div>
              <div>
                <label className="form-label" htmlFor="position">
                  Posición:
                </label>
                <input
                  id="position"
                  name="position"
                  className="form-control"
                  type="text"
                  value={formState.position || ""}
                  onChange={onInputChange}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "10px",
                  marginTop: "10px",
                }}
              >
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cerrar
                </button>
                <button type="submit" className="btn btn-primary">
                  {loading ? <CircularProgress size={20} /> : "Guardar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ButtonAddPerson;
