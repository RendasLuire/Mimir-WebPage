import BorderColorIcon from "@mui/icons-material/BorderColor";
import useAnnexed from "../../hooks/useAnnexed";
import useForm from "../../hooks/useForm";
import moment from "moment";
import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import Global from "../../helpers/Global";

const EditAnnexedInfoCard = () => {
  const { annexedData, setUpdate } = useAnnexed({});
  const { formState, onInputChange } = useForm(annexedData);
  const { auth } = useAuth();

  useEffect(() => {}, [annexedData]);

  const handleSaveClick = async (e) => {
    e.preventDefault();
    try {
      if (
        formState.number === annexedData.number &&
        formState.bill === annexedData.bill &&
        formState.startDate ===
          moment(annexedData.startDate).format("YYYY-MM-DD") &&
        formState.endDate === moment(annexedData.endDate).format("YYYY-MM-DD")
      ) {
        return false;
      }
      const token = localStorage.getItem("token");

      if (!token) {
        return false;
      }

      const dataToUpdate = { ...formState, user: auth._id };

      const request = fetch(`${Global.url}annexeds/${annexedData._id}`, {
        method: "PATCH",
        body: JSON.stringify(dataToUpdate),
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      await request.json();

      if (!request.ok) {
        return false;
      }

      setUpdate(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card glass">
      <div className="card-body text-center">
        <button
          className="btn btn-outline-primary"
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#formInfoAnnexed"
        >
          <BorderColorIcon />
        </button>
        <p className="card-text">
          <small className="text-body-secondary">Editar</small>
        </p>
      </div>
      <div
        className="modal fade"
        id="formInfoAnnexed"
        tabIndex={"-1"}
        aria-labelledby="formInfoAnnexed"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content glass">
            <div className="modal-header">
              <h5 className="modal-title" id="formIndexAnnexed">
                Informacion de Anexo
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
                  <label htmlFor="number" className="form-label">
                    Numero:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="number"
                    name="number"
                    onChange={onInputChange}
                    value={formState.number}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="startDate" className="form-label">
                    Fecha de Inicio:
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="startDate"
                    name="startDate"
                    onChange={onInputChange}
                    value={moment(formState.startDate).format("YYYY-MM-DD")}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="endDate" className="form-label">
                    Fecha de Termino:
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="endDate"
                    name="endDate"
                    onChange={onInputChange}
                    value={moment(formState.endDate).format("YYYY-MM-DD")}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="bill" className="form-label">
                    Factura:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="bill"
                    name="bill"
                    onChange={onInputChange}
                    value={formState.bill}
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

export default EditAnnexedInfoCard;
