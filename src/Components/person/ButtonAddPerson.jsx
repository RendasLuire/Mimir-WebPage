import { useState } from "react";
import useForm from "../../hooks/useForm";
import Alert from "@mui/material/Alert";
import useAuth from "../../hooks/useAuth";
import Global from "../../helpers/Global";

const ButtonAddPerson = () => {
  const { formState, onInputChange } = useForm({});
  const [message, setMessage] = useState();
  const { auth } = useAuth();

  const saveData = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    let itemToSave = formState;
    itemToSave.userTI = auth._id;

    const request = await fetch(Global.url + "persons/register", {
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
          data-bs-target="#AddPersonModal"
          className="btn btn-success"
        >
          +
        </button>
      </div>
      <div
        className="modal fade container"
        id="AddPersonModal"
        aria-labelledby="titleAddPerson"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="titleAssPerson">
                Add Person
              </h1>
              <button
                className="btn-close"
                type="button"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form className="glass" onSubmit={saveData}>
              <div className="mb-1">
                <div>
                  {message ? <Alert severity="error">{message}</Alert> : ""}
                </div>
                <label className="form-label" htmlFor="name">
                  Name:
                </label>
                <input
                  id="name"
                  name="name"
                  className="form-control"
                  type="text"
                  onChange={onInputChange}
                />
              </div>
              <div className="mb-1">
                <label className="form-label" htmlFor="department">
                  Department:
                </label>
                <input
                  id="department"
                  name="department"
                  className="form-control"
                  type="text"
                  onChange={onInputChange}
                />
              </div>
              <div className="mb-1">
                <label className="form-label" htmlFor="position">
                  Position:
                </label>
                <input
                  id="position"
                  name="position"
                  className="form-control"
                  type="text"
                  onChange={onInputChange}
                />
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

export default ButtonAddPerson;
