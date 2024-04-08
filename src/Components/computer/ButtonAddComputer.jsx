import { useState } from "react";
import Global from "../../helpers/Global";
import useAuth from "../../hooks/useAuth";
import useForm from "../../hooks/useForm";
import Alert from "@mui/material/Alert";

const ButtonAddComputer = () => {
  const { formState, onInputChange } = useForm({});
  const [message, setMessage] = useState();
  const { auth } = useAuth();

  const saveData = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    let itemToSave = formState;
    itemToSave.userTI = auth._id;

    const request = await fetch(Global.url + "computers/register", {
      method: "POST",
      body: JSON.stringify(itemToSave),
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const response = await request.json();

    if (!(response.status == 201)) {
      setMessage(response.message);
    }
    if (response.status == 201) {
      window.location.reload();
    }
  };

  return (
    <>
      <div className="m-3 container">
        <button
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#AddComputerModal"
          className="btn btn-success"
        >
          +
        </button>
      </div>

      <div
        className="modal fade container"
        id="AddComputerModal"
        aria-labelledby="titleAddComputer"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="titleAddComputer">
                Add Item
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={saveData}>
              <div className="modal-body">
                <div className="mb-1">
                  <div>
                    {message ? <Alert severity="error">{message}</Alert> : ""}
                  </div>
                  <label htmlFor="brand" className="form-label">
                    Brand:
                  </label>
                  <input
                    id="brand"
                    name="brand"
                    className="form-control"
                    type="text"
                    onChange={onInputChange}
                  />
                </div>
                <div className="mb-1">
                  <label htmlFor="model" className="form-label">
                    Model:
                  </label>
                  <input
                    id="model"
                    name="model"
                    className="form-control"
                    type="text"
                    onChange={onInputChange}
                  />
                </div>
                <div className="mb-1">
                  <label htmlFor="serialNumber" className="form-label">
                    Serial Number:
                  </label>
                  <input
                    id="serialNumber"
                    name="serialNumber"
                    className="form-control"
                    type="text"
                    onChange={onInputChange}
                  />
                </div>
                <div className="mb-1">
                  <label htmlFor="type" className="form-label">
                    Type:
                  </label>
                  <select
                    id="type"
                    name="type"
                    onChange={onInputChange}
                    className="form-select"
                  >
                    <option selected value={""}>
                      Select type
                    </option>
                    <option value={"computer"}>Computadora</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ButtonAddComputer;
