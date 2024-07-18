import UploadIcon from "@mui/icons-material/Upload";
import useForm from "../../hooks/useForm";
import useAnnexed from "../../hooks/useAnnexed";
import useAuth from "../../hooks/useAuth";
import Global from "../../helpers/Global";

const LoadDevicesCard = () => {
  const { formState, onInputChange } = useForm({});
  const { annexedData, setUpdate } = useAnnexed();
  const { auth } = useAuth();

  const handleSaveClick = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      let itemToSave = { ...formState, user: auth._id };

      const request = await fetch(
        `${Global.url}annexeds/masive/${annexedData._id}`,
        {
          method: "PATCH",
          body: JSON.stringify(itemToSave),
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      if (request.ok) {
        setUpdate(true);
      }
    } catch (error) {
      console.log("Error: " + error);
    }
  };

  return (
    <div className="card glass">
      <div className="card-body text-center">
        <button
          className="btn btn-outline-primary"
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#formChargeDevices"
        >
          <UploadIcon />
        </button>
        <p className="card-text">
          <small className="text-body-secondary">Cargar equipos</small>
        </p>
      </div>
      <div
        className="modal fade"
        id="formChargeDevices"
        tabIndex={"-1"}
        aria-labelledby="formChargeDevices"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content glass">
            <div className="modal-header">
              <h5 className="modal-title" id="formIndexDevices">
                Informacion del anexo:
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
                  <label className="form-label" htmlFor="brand">
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
                <div className="mb-3">
                  <label className="form-label" htmlFor="description">
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
                <div className="mb-3">
                  <label className="form-label" htmlFor="description">
                    Tipo de Dispositivo:
                  </label>
                  <select
                    id="typeDevice"
                    name="typeDevice"
                    className="form-select"
                    onChange={onInputChange}
                  >
                    <option value={""}>Selecciona un tipo</option>
                    <option value={"desktop"}>Desktop</option>
                    <option value={"impresora"}>Impresora</option>
                    <option value={"monitor"}>Monitor</option>
                    <option value={"laptop"}>Laptop</option>
                    <option value={"tablet"}>Tablet</option>
                    <option value={"accesorio"}>Accesorio</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="serialNumber">
                    Numero de Serie:
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
                  <button className="btn btn-success" onClick={handleSaveClick}>
                    Agregar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadDevicesCard;
