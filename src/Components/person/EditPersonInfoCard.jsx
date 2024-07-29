import BorderColorIcon from "@mui/icons-material/BorderColor";
import usePerson from "../../hooks/usePerson";
import useForm from "../../hooks/useForm";
import useAuth from "../../hooks/useAuth";
import { Global } from "@emotion/react";
import { useEffect } from "react";

const EditPersonInfoCard = () => {
  const { personData, setUpdate } = usePerson({});
  const { formState, onInputChange } = useForm({
    name: personData.name || "",
    department: personData.department.name || "",
    position: personData.position || "",
  });
  const { auth } = useAuth();

  const handleSaveClick = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const messageUpdate = { ...formState, user: auth._id };

      const request = await fetch(`${Global.url}persons/${personData._id}`, {
        method: "PATCH",
        body: JSON.stringify(messageUpdate),
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      if (request.ok) {
        setUpdate(true);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {}, [personData]);

  return (
    <div className="card glass">
      <div className="card-body text-center">
        <button
          className="btn btn-outline-primary"
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#formInfoPerson"
        >
          <BorderColorIcon />
        </button>
        <p className="card-text">
          <small className="text-body-secondary">Editar</small>
        </p>
      </div>
      <div
        className="modal fade"
        id="formInfoPerson"
        tabIndex={"-1"}
        aria-labelledby="formInfoPerson"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content glass">
            <div className="modal-header">
              <h5 className="modal-title" id="formInfoPerson">
                Informacion de la persona
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Nombre:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={formState.name}
                    onChange={onInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="department" className="form-label">
                    Departamento:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="department"
                    name="department"
                    value={formState.department.name}
                    onChange={onInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="position" className="form-label">
                    Posicion:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="position"
                    name="position"
                    value={formState.position}
                    onChange={onInputChange}
                  />
                </div>
              </form>
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
                type="button"
                className="btn btn-primary"
                onClick={handleSaveClick}
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPersonInfoCard;
