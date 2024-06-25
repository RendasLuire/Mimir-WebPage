import BorderColorIcon from "@mui/icons-material/BorderColor";
import useDevice from "../../hooks/useDevice";
import { useEffect, useState } from "react";
import Global from "../../helpers/Global";
import useForm from "../../hooks/useForm";
import { CircularProgress } from "@mui/material";
import useAuth from "../../hooks/useAuth";
import { capitalizeFirstLetterOfEachWord } from "../../helpers/Tools";

const StatusInfoCard = () => {
  const { deviceData, setUpdate } = useDevice({});
  const [listSettings, setListSettings] = useState([]);
  const { formState, onInputChange } = useForm({});
  const { auth } = useAuth();

  const getStatus = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return false;
      }

      const request = await fetch(`${Global.url}settings/statusDevice`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      const response = await request.json();
      const { data } = response;

      setListSettings(data);
    } catch (error) {
      console.log("Error:" + error);
    }
  };

  useEffect(() => {
    getStatus();
  }, [deviceData]);

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

      const request = await fetch(Global.url + "device/" + deviceData._id, {
        method: "PATCH",
        body: JSON.stringify(messageToSend),
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      await request.json();

      if (request.ok) {
        setUpdate(true);
      }
    } catch (error) {
      console.log("Error: " + error);
    }
  };

  return (
    <div className="card glass">
      <div className="card-body d-flex justify-content-between align-items-center">
        <div className="d-flex flex-column flex-grow-1">
          <label className="card-title">
            {capitalizeFirstLetterOfEachWord(deviceData.status.label)}
          </label>
          <p className="card-text">
            <small className="text-body-secondary">Estatus</small>
          </p>
        </div>
        <button
          type="button"
          className="btn btn-outline-primary mx-1"
          data-bs-toggle="modal"
          data-bs-target="#listStatus"
          style={{ flexShrink: 0 }}
        >
          <BorderColorIcon />
        </button>
      </div>

      <div
        className="modal fade"
        id="listStatus"
        tabIndex={"-1"}
        aria-labelledby="listStatus"
        aria-hidden={"true"}
      >
        <div className="modal-dialog">
          <div className="modal-content glass">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="listStatus">
                Selecciona un status:
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {listSettings ? (
                <select
                  className="form-select"
                  name="status"
                  id="status"
                  onChange={onInputChange}
                >
                  {listSettings.map((item) => (
                    <option key={item.value} value={item.value}>
                      {capitalizeFirstLetterOfEachWord(item.label)}
                    </option>
                  ))}
                </select>
              ) : (
                <div className="d-flex justify-content-center">
                  <CircularProgress />
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
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

export default StatusInfoCard;
