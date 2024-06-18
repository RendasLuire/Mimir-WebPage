import BorderColorIcon from "@mui/icons-material/BorderColor";
import useDevice from "../../hooks/useDevice";
import useForm from "../../hooks/useForm";
import useAuth from "../../hooks/useAuth";
import Global from "../../helpers/Global";

const EditInfoCard = () => {
  const { deviceData, setUpdate, setFormState } = useDevice({});
  const { formState, onInputChange } = useForm(deviceData);
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

    const request = await fetch(`${Global.url}device/${deviceData._id}`, {
      method: "PATCH",
      body: JSON.stringify(messageUpdate),
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    await request.json();

    if (request.ok) {
      setFormState({});
    }
  };

  return (
    <div>
      <div className="card-body glass d-flex justify-content-between align-items-center">
        <div className="d-flex flex-column px-2">
          <label className="card-title">Edit</label>
        </div>
        <button
          className="btn"
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#formInfoDevice"
        >
          <BorderColorIcon />
        </button>
      </div>
      <div
        className="modal fade"
        id="formInfoDevice"
        tabIndex={"-1"}
        aria-labelledby="formInfoDevice"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content glass">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="formInfoDevice">
                Informacion del dispositivo
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="p-3">
                <div className="mb-1">
                  <label className="form-label" htmlFor="hostname">
                    Hostname:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="hostname"
                    id="hostname"
                    value={deviceData.hostname}
                    onChange={onInputChange}
                  />
                </div>
                <div className="mb-1">
                  <label className="form-label" htmlFor="serialNumber">
                    Numero de Serie:
                  </label>
                  <input
                    className="form-control"
                    name="serialNumber"
                    id="serialNumber"
                    value={deviceData.serialNumber}
                    onChange={onInputChange}
                  />
                </div>
                <div className="mb-1 col">
                  <label className="form-label" htmlFor="brand">
                    Marca:
                  </label>
                  <input
                    className="form-control"
                    name="brand"
                    id="brand"
                    value={deviceData.brand}
                    onChange={onInputChange}
                  />
                </div>
                <div className="mb-1 col">
                  <label className="form-label" htmlFor="model">
                    Modelo:
                  </label>
                  <input
                    className="form-control"
                    name="model"
                    id="model"
                    value={deviceData.model}
                    onChange={onInputChange}
                  />
                </div>
                <div className="mb-1">
                  <label className="form-label" htmlFor="details">
                    Detalles:
                  </label>
                  <textarea
                    className="form-control"
                    name="details"
                    id="details"
                    value={deviceData.details}
                    onChange={onInputChange}
                  />
                </div>
                <div className="mb-1">
                  <label className="form-label" htmlFor="annexed">
                    Anexo:
                  </label>
                  <input
                    className="form-control"
                    name="annexed"
                    id="annexed"
                    value={deviceData.annexed.number}
                  />
                </div>
                <div className="mb-1">
                  <div className="form-check form-check-inline">
                    <label className="form-check-label" htmlFor="custom">
                      Personalizado
                    </label>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="custom"
                      id="custom"
                      checked={deviceData.custom}
                      onChange={() => handleCustomChange(true)}
                    />
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="custom"
                      id="custom"
                      checked={!deviceData.custom}
                      onChange={() => handleCustomChange(false)}
                    />
                    <label className="form-check-label" htmlFor="custom">
                      Compartido
                    </label>
                  </div>
                </div>
                <div className="mb-1">
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="headphones"
                      name="headphones"
                      checked={deviceData.headphones}
                      onChange={(e) =>
                        handleCheckboxChange("headphones", e.target.checked)
                      }
                    />
                    <label className="form-check-label" htmlFor="headphones">
                      Audifonos
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="adaptVGA"
                      name="adaptVGA"
                      checked={deviceData.adaptVGA}
                      onChange={(e) =>
                        handleCheckboxChange("adaptVGA", e.target.checked)
                      }
                    />
                    <label className="form-check-label" htmlFor="adaptVGA">
                      Adaptador
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="mouse"
                      name="mouse"
                      checked={deviceData.mouse}
                      onChange={(e) =>
                        handleCheckboxChange("mouse", e.target.checked)
                      }
                    />
                    <label className="form-check-label" htmlFor="mouse">
                      Mouse
                    </label>
                  </div>
                </div>
                <div className="text-center">
                  <button className="btn btn-primary" onClick={handleSaveClick}>
                    Guardar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditInfoCard;
