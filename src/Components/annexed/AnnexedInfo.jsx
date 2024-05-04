import { useEffect, useState } from "react";
import useAnnexed from "../../hooks/useAnnexed";
import useForm from "../../hooks/useForm";
import moment from "moment";
import useAuth from "../../hooks/useAuth";
import Global from "../../helpers/Global";
import { Alert, CircularProgress } from "@mui/material";

moment.locale("es-mx");

const AnnexedInfo = () => {
  const { annexedData, setAnnexedData } = useAnnexed();
  const { auth } = useAuth();
  const { formState, onInputChange } = useForm({
    annexedNumber: annexedData.annexedNumber,
    bill: annexedData.bill,
    startDate: moment(annexedData.startDate).format("YYYY-MM-DD"),
    endDate: moment(annexedData.endDate).format("YYYY-MM-DD"),
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setLoading(false);
    setMessage("");
  }, [annexedData]);

  const handleEditClick = (e) => {
    e.preventDefault();
    setIsEditing(true);
  };

  const handleSaveClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (
        formState.annexedNumber === annexedData.annexedNumber &&
        formState.bill === annexedData.bill &&
        formState.startDate ===
          moment(annexedData.startDate).format("YYYY-MM-DD") &&
        formState.endDate === moment(annexedData.endDate).format("YYYY-MM-DD")
      ) {
        setIsEditing(false);
        setLoading(false);
        return;
      }

      const token = localStorage.getItem("token");

      if (!token) {
        setIsEditing(false);
        setLoading(false);
        return;
      }

      const dataToUpdate = { ...formState, userTI: auth._id };

      const request = fetch(Global.url + "annexeds/" + annexedData._id, {
        method: "PATCH",
        body: JSON.stringify(dataToUpdate),
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      const response = await request.json();

      console.log(request);

      if (!request.ok) {
        setIsEditing(false);
        setLoading(false);
      }

      const { data, message } = response;

      setAnnexedData(data);
      setMessage(message);
      console.log(message);
      setIsEditing(false);
      setLoading(false);
    } catch (error) {
      setMessage(error);
      console.log(message);
      setIsEditing(false);
      setLoading(false);
    }
  };
  return (
    <div className="container">
      {!formState.annexedNumber ? (
        <div className="d-flex justify-content-center m-3">
          <CircularProgress />
        </div>
      ) : (
        <div className="">
          <form>
            {message && (
              <Alert variant="outlined" severity="error">
                message
              </Alert>
            )}
            <div className="mt-1">
              <label htmlFor="annexedNumber" className="form-label">
                Anexo:
              </label>
              <input
                id="annexedNumber"
                type="text"
                name="annexedNumber"
                className="form-control"
                value={formState.annexedNumber}
                onChange={onInputChange}
                disabled={!isEditing}
              />
            </div>
            <div className="mt-1">
              <label htmlFor="bill" className="form-label">
                Factura:
              </label>
              <input
                id="bill"
                type="text"
                name="bill"
                className="form-control"
                value={formState.bill}
                onChange={onInputChange}
                disabled={!isEditing}
              />
            </div>
            <div className="mt-1">
              <label htmlFor="startDate" className="form-label">
                Fecha de Inicio:
              </label>
              <input
                id="startDate"
                name="startDate"
                type="date"
                className="form-control"
                value={formState.startDate}
                onChange={onInputChange}
                disabled={!isEditing}
              />
            </div>
            <div className="mt-1">
              <label htmlFor="endDate" className="form-label">
                Fecha de Termino:
              </label>
              <input
                id="endDate"
                name="endDate"
                type="date"
                className="form-control"
                value={formState.endDate}
                onChange={onInputChange}
                disabled={!isEditing}
              />
            </div>
            <div className="d-flex justify-content-center my-1">
              {loading ? (
                <CircularProgress />
              ) : isEditing ? (
                <button className="btn btn-success" onClick={handleSaveClick}>
                  Guardar
                </button>
              ) : (
                <button className="btn btn-success" onClick={handleEditClick}>
                  Editar
                </button>
              )}
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AnnexedInfo;
