import { useEffect } from "react";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import useDevice from "../../hooks/useDevice";
import useForm from "../../hooks/useForm";
import useAuth from "../../hooks/useAuth";
import Global from "../../helpers/Global";

const EditInfoCard = () => {
  const { deviceData, setUpdate } = useDevice({});
  const { formState, onInputChange, setFormState } = useForm({
    hostname: deviceData.hostname || "",
    serialNumber: deviceData.serialNumber || "",
    brand: deviceData.brand || "",
    model: deviceData.model || "",
    details: deviceData.details || "",
    annexed: deviceData.annexed?.number || "",
    custom: deviceData.custom || false,
    headphones: deviceData.headphones || false,
    adaptVGA: deviceData.adaptVGA || false,
    mouse: deviceData.mouse || false,
  });
  const { auth } = useAuth();

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

  const handleSaveClick = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const messageUpdate = { ...formState, user: auth._id };

    try {
      const request = await fetch(`${Global.url}device/${deviceData._id}`, {
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

  useEffect(() => {}, [deviceData]);

  return (
    <div className="card glass">
      <div className="card-body text-center">
        <button
          className="btn btn-outline-primary"
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#formInfoDevice"
        >
          <BorderColorIcon />
        </button>
        <p className="card-text">
          <small className="text-body-secondary">Editar</small>
        </p>
      </div>

      <div
        className="modal fade"
        id="formInfoDevice"
        tabIndex="-1"
        aria-labelledby="formInfoDevice"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content glass">
            <div className="modal-header">
              <h5 className="modal-title" id="formInfoDevice">
                Información del dispositivo
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
                  <label htmlFor="hostname" className="form-label">
                    Hostname:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="hostname"
                    name="hostname"
                    value={formState.hostname}
                    onChange={onInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="serialNumber" className="form-label">
                    Número de Serie:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="serialNumber"
                    name="serialNumber"
                    value={formState.serialNumber}
                    onChange={onInputChange}
                  />
                </div>
                <div className="row mb-3">
                  <div className="col-3">
                    <label htmlFor="brand" className="form-label">
                      Marca:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="brand"
                      name="brand"
                      value={formState.brand}
                      onChange={onInputChange}
                    />
                  </div>
                  <div className="col">
                    <label htmlFor="model" className="form-label">
                      Modelo:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="model"
                      name="model"
                      value={formState.model}
                      onChange={onInputChange}
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="details" className="form-label">
                    Detalles:
                  </label>
                  <textarea
                    className="form-control"
                    id="details"
                    name="details"
                    value={formState.details}
                    onChange={onInputChange}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="annexed" className="form-label">
                    Anexo:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="annexed"
                    name="annexed"
                    value={formState.annexed}
                    onChange={onInputChange}
                  />
                </div>
                <div className="mb-3">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="custom"
                      id="custom"
                      checked={formState.custom}
                      onChange={() => handleCustomChange(true)}
                    />
                    <label className="form-check-label" htmlFor="custom">
                      Personalizado
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="custom"
                      id="shared"
                      checked={!formState.custom}
                      onChange={() => handleCustomChange(false)}
                    />
                    <label className="form-check-label" htmlFor="shared">
                      Compartido
                    </label>
                  </div>
                </div>
                <div className="mb-3">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="headphones"
                      name="headphones"
                      checked={formState.headphones}
                      onChange={(e) =>
                        handleCheckboxChange("headphones", e.target.checked)
                      }
                    />
                    <label className="form-check-label" htmlFor="headphones">
                      Audífonos
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="adaptVGA"
                      name="adaptVGA"
                      checked={formState.adaptVGA}
                      onChange={(e) =>
                        handleCheckboxChange("adaptVGA", e.target.checked)
                      }
                    />
                    <label className="form-check-label" htmlFor="adaptVGA">
                      Adaptador VGA
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="mouse"
                      name="mouse"
                      checked={formState.mouse}
                      onChange={(e) =>
                        handleCheckboxChange("mouse", e.target.checked)
                      }
                    />
                    <label className="form-check-label" htmlFor="mouse">
                      Mouse
                    </label>
                  </div>
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

export default EditInfoCard;
