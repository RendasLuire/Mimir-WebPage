import { useState } from "react";
import useForm from "../../hooks/useForm";

const InfoComputer = ({ computer }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { formState, onInputChange } = useForm(computer);

  const { hostname } = formState;

  const handleEditClick = (e) => {
    e.preventDefault();
    setIsEditing(true);
  };

  const handleSaveClick = (e) => {
    e.preventDefault();
    setIsEditing(false);
  };

  return (
    <div className="container glass mt-3">
      <form>
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
            value={formState.brand}
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
            value={formState.model}
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
            value={formState.serialNumber}
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
            value={formState.status}
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
            value={formState.user}
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
      </form>
    </div>
  );
};

export default InfoComputer;
