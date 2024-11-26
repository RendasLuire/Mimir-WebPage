import BorderColorIcon from "@mui/icons-material/BorderColor";
import usePerson from "../../hooks/usePerson";
import useForm from "../../hooks/useForm";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import Global from "../../helpers/Global";

const EditPersonInfoCard = () => {
  const { personData, setUpdate } = usePerson({});
  const { formState, onInputChange, setFormState } = useForm({
    name: personData?.name || "",
    department: personData?.department.name || "",
    position: personData?.position || "",
    bussinesUnit: personData?.bussinesUnit || "",
  });
  const { auth } = useAuth();
  const [storages, setStorages] = useState([]);

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
        const modalElement = document.getElementById("formInfoPerson");
        const modalInstance = window.bootstrap.Modal.getInstance(modalElement);
        if (modalInstance) {
          modalInstance.hide();
        }
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const getStorages = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
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

  useEffect(() => {
    if (personData) {
      getStorages();
    }
  }, [personData]);

  const handleBussinessUnitChange = (e) => {
    const [id, name] = e.target.value.split("|");
    setFormState((prevState) => ({
      ...prevState,
      bussinesUnit: { id, name },
    }));
  };

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
                    name="name"
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
                <div className="mb-3">
                  <label className="form-label" htmlFor="bussinessUnit">
                    Unidad de Negocio:
                  </label>
                  <select
                    className="form-select"
                    id="bussinessUnit"
                    name="bussinessUnit"
                    value={`${formState.bussinesUnit.id}|${formState.bussinesUnit.name}`}
                    onChange={handleBussinessUnitChange}
                  >
                    <option value="">
                      Selecciona una unidad de negocio...
                    </option>
                    {storages.map((item) => (
                      <option
                        key={item._id}
                        value={`${item._id}|${item.complex}`}
                      >
                        {item.complex}
                      </option>
                    ))}
                  </select>
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
