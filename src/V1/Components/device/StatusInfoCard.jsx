import useDevice from "../../hooks/useDevice";
import { useEffect, useState } from "react";
import Global from "../../helpers/Global";
import useForm from "../../hooks/useForm";
import { CircularProgress, Tooltip } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import useAuth from "../../hooks/useAuth";
import { capitalizeFirstLetterOfEachWord } from "../../helpers/Tools";

const StatusInfoCard = () => {
  const { deviceData, setUpdate } = useDevice({});
  const [listSettings, setListSettings] = useState([]);
  const { formState, onInputChange } = useForm({
    status: {
      value: deviceData.status.value || "",
      label: deviceData.status.label || "",
    },
  });
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
      console.log(listSettings);
    } catch (error) {
      console.log("Error:" + error);
    }
  };

  useEffect(() => {
    getStatus();
  }, [deviceData]);

  const getColorAndLabel = (statusValue) => {
    const status = listSettings.find((item) => item.value === statusValue);
    return status
      ? { color: status.option, label: status.label }
      : { color: "#F44336", label: "Desconocido" };
  };

  const { color, label } = getColorAndLabel(deviceData.status.value);

  const handleClickSave = async () => {
    if (!formState || Object.keys(formState).length === 0) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      if (!token || !deviceData) {
        return false;
      }

      const messageToSend = {
        status: {
          value: formState.status,
          label: listSettings.find((item) => item.value == formState.status)
            .label,
        },
        user: auth._id,
      };

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
    <div>
      <Tooltip title={label} arrow>
        <div
          className="card glass text-center"
          data-bs-toggle="modal"
          data-bs-target="#listStatus"
        >
          <div className="card-body d-flex justify-content-between align-items-center">
            <CircleIcon
              sx={{ color, width: 40, height: 40 }}
              className="me-3"
            />
            <div className="d-flex flex-column flex-grow-1">
              <label className="card-title">
                {capitalizeFirstLetterOfEachWord(deviceData.status.label)}
              </label>
              <p className="card-text">
                <small className="text-body-secondary">Estatus</small>
              </p>
            </div>
          </div>
        </div>
      </Tooltip>

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
                  value={formState.status.value}
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
