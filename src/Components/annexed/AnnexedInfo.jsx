import { useEffect, useState } from "react";
import useAnnexed from "../../hooks/useAnnexed";
import useForm from "../../hooks/useForm";
import moment from "moment";
import useAuth from "../../hooks/useAuth";
import Global from "../../helpers/Global";

moment.locale("es-mx");

const AnnexedInfo = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { annexedData } = useAnnexed();
  const { auth } = useAuth();
  const { formState, setFormState } = useForm({
    annexedNumber: annexedData.annexedNumber,
    startDate: moment(annexedData.startDate).format("YYYY-MM-DD"),
    endDate: moment(annexedData.endDate).format("YYYY-MM-DD"),
    bill: annexedData.bill,
  });

  useEffect(() => {
    if (annexedData) {
      setFormState((prevState) => ({
        ...prevState,
        annexedNumber: annexedData.annexedNumber,
        startDate: moment(annexedData.startDate).format("YYYY-MM-DD"),
        endDate: moment(annexedData.endDate).format("YYYY-MM-DD"),
        bill: annexedData.bill,
      }));
    }
  }, [annexedData]);

  const handleEditClick = (e) => {
    e.preventDefault();
    setIsEditing(true);
  };

  const handleSaveClick = async (e) => {
    e.preventDefault();

    const changesMade = Object.keys(formState).some(
      (key) => formState[key] !== annexedData[key]
    );

    if (!changesMade) {
      setIsEditing(false);
      return;
    }

    const token = localStorage.getItem("token");
    const annexedToSave = { ...formState, userTI: auth._id };

    const request = await fetch(Global.url + "annexeds/" + annexedData._id, {
      method: "PATCH",
      body: JSON.stringify(computerToSave),
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    await request.json();

    if (request.ok) {
      setFormState(annexedToSave);
      setIsEditing(false);
    }
  };

  return (
    <div className="container mt-3">
      <div className="glass p-3">
        <div className="mb-1">
          <label htmlFor="annexedNumber" className="form-label">
            Anexo:
          </label>
          <input
            type="text"
            className="form-control"
            name="annexedNumber"
            id="annexedNumber"
            value={formState.annexedNumber}
            disabled={!isEditing}
          />
        </div>
        <div className="mb-1">
          <label htmlFor="startDate" className="form-label">
            Fecha de Inicio:
          </label>
          <input
            type="date"
            className="form-control"
            name="startDate"
            id="startDate"
            value={formState.startDate}
            disabled={!isEditing}
          />
        </div>
        <div className="mb-1">
          <label htmlFor="endDate" className="form-label">
            Fecha de Termino:
          </label>
          <input
            type="date"
            className="form-control"
            name="endDate"
            id="endDate"
            value={formState.endDate}
            disabled={!isEditing}
          />
        </div>
        <div className="mb-1">
          <label htmlFor="bill" className="form-label">
            Factura:
          </label>
          <input
            type="text"
            className="form-control"
            name="bill"
            id="bill"
            value={formState.bill}
            disabled={!isEditing}
          />
        </div>
        <div className="text-center">
          {isEditing ? (
            <button className="btn btn-primary" onClick={handleSaveClick}>
              Guardar
            </button>
          ) : (
            <button className="btn btn-primary" onClick={handleEditClick}>
              Editar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnnexedInfo;
