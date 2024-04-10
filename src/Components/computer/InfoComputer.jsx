import { useEffect, useState } from "react";
import useForm from "../../hooks/useForm";
import Global from "../../helpers/Global";
import useAuth from "../../hooks/useAuth";
import useComputer from "../../hooks/useComputer";

const InfoComputer = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { computerInfo } = useComputer();
  const { formState, onInputChange, setFormState } = useForm(computerInfo);
  const { auth } = useAuth();

  const { hostname, brand, model, serialNumber, status, user } = formState;

  useEffect(() => {
    setFormState(computerInfo);
  }, [computerInfo]);

  const handleEditClick = (e) => {
    e.preventDefault();
    setIsEditing(true);
  };

  const handleSaveClick = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const computerToSave = formState;
    computerToSave.userTI = auth._id;

    const request = await fetch(
      Global.url + "computers/update/" + computerInfo._id,
      {
        method: "PUT",
        body: JSON.stringify(computerToSave),
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );

    const response = await request.json();

    console.log(response);

    setIsEditing(false);
  };

  return (
    <div className="container glass mt-3">
      <div className="mb-1">
        <label className="form-label" htmlFor="hostname">
          Hostname:
        </label>
        <input
          type="text"
          className="form-control"
          name="hostname"
          id="hostname"
          value={hostname}
          disabled={!isEditing}
          onChange={onInputChange}
        />
      </div>
      <div className="mb-1">
        <label className="form-label" htmlFor="brand">
          Brand:
        </label>
        <input
          className="form-control"
          name="brand"
          id="brand"
          value={brand}
          disabled={!isEditing}
          onChange={onInputChange}
        />
      </div>
      <div className="mb-1">
        <label className="form-label" htmlFor="model">
          Model:
        </label>
        <input
          className="form-control"
          name="model"
          id="model"
          value={model}
          disabled={!isEditing}
          onChange={onInputChange}
        />
      </div>
      <div className="mb-1">
        <label className="form-label" htmlFor="serialNumber">
          Serial Number:
        </label>
        <input
          className="form-control"
          name="serialNumber"
          id="serialNumber"
          value={serialNumber}
          disabled={!isEditing}
          onChange={onInputChange}
        />
      </div>
      <div className="mb-1">
        <label className="form-label" htmlFor="status">
          status:
        </label>
        <select
          className="form-control"
          name="status"
          id="status"
          value={status}
          disabled={!isEditing}
          onChange={onInputChange}
        >
          <option value={"available"}>Activo</option>
          <option value={"in storage"}>Guardado</option>
        </select>
      </div>
      <div className="mb-1">
        <label className="form-label" htmlFor="user">
          User:
        </label>
        <input
          className="form-control"
          name="user"
          id="user"
          value={user}
          disabled
        />
      </div>
      <div>
        {isEditing ? (
          <button className="btn btn-primary" onClick={handleSaveClick}>
            Save
          </button>
        ) : (
          <button className="btn btn-primary" onClick={handleEditClick}>
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default InfoComputer;
