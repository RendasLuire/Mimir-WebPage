import BorderColorIcon from "@mui/icons-material/BorderColor";
import useDevice from "../../hooks/useDevice";
import useForm from "../../hooks/useForm";
import useAuth from "../../hooks/useAuth";
import Global from "../../helpers/Global";

const UbicationCard = () => {
  const { deviceData, setUpdate } = useDevice({});
  const { formState, onInputChange } = useForm({
    phisicRef: deviceData.phisicRef,
  });
  const { auth } = useAuth();

  const handleClickSave = async () => {
    if (!formState || Object.keys(formState).length === 0) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      if (!token || !deviceData) {
        return false;
      }

      const messageToSend = { ...formState, user: auth._id };

      console.log(messageToSend);

      const request = await fetch(`${Global.url}device/${deviceData._id}`, {
        method: "PATCH",
        body: JSON.stringify(messageToSend),
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      await request.json();

      console.log(request);

      if (request.ok) {
        setUpdate(true);
      }
    } catch (error) {
      console.log("Error: " + error);
    }
  };

  return (
    <div className="card-body glass d-flex justify-content-between align-items-center">
      <div className="d-flex flex-column px-2">
        <label className="card-title">{deviceData.phisicRef}</label>
        <p className="card-text">
          <small className="text-body-secondary">Referencia fisica</small>
        </p>
      </div>
      <button
        className="btn"
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#inputUbication"
      >
        <BorderColorIcon />
      </button>
      <div
        className="modal fade"
        id="inputUbication"
        tabIndex={"-1"}
        aria-labelledby="inputUbication"
        aria-hidden={"true"}
      >
        <div className="modal-dialog">
          <div className="modal-content glass">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="inputUbication">
                Ingresa la ubicacion
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <label className="form-label" htmlFor="phisicRef">
                Referencia fisica
              </label>
              <input
                type="text"
                className="form-control"
                id="phisicRef"
                name="phisicRef"
                onChange={onInputChange}
                value={formState.phisicRef}
              />
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                type="button"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleClickSave}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UbicationCard;
