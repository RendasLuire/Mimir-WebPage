import { useState } from "react";
import useForm from "../../hooks/useForm";
import useAuth from "../../hooks/useAuth";
import Global from "../../helpers/Global";

const InfoComputer = ({ computer }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { formState, onInputChange } = useForm(computer);
  const { auth } = useAuth();
  const { hostname, model, user, brand, serialNumber, status, type } =
    formState;

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    const token = localStorage.getItem("token");

    let itemToSave = formState;
    itemToSave.userTI = auth._id;

    const request = await fetch(
      Global.url + "computers/update/" + itemToSave._id,
      {
        method: "PUT",
        body: JSON.stringify(itemToSave),
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );

    await request.json();

    setIsEditing(false);
    window.location.reload();
  };

  return (
    <div className="countainer m-2">
      <form>
        <div className="mb-1">
          <label className="form-label" htmlFor="hostname">
            Hostname:
          </label>
          <input
            className="form-control"
            type="text"
            name="hostname"
            id="hostname"
            value={hostname}
            disabled={!isEditing}
            onChange={onInputChange}
          />
        </div>
        <div className="mb-1">
          <label type="text" htmlFor="brand" className="form-label">
            Brand:
          </label>
          <input
            className="form-control"
            type="text"
            name="brand"
            id="brand"
            value={brand}
            disabled={!isEditing}
            onChange={onInputChange}
          />
        </div>
        <div className="mb-1">
          <label type="text" htmlFor="model" className="form-label">
            Model:
          </label>
          <input
            className="form-control"
            type="text"
            name="model"
            id="model"
            value={model}
            disabled={!isEditing}
            onChange={onInputChange}
          />
        </div>
        <div className="mb-1">
          <label htmlFor="serialNumber" className="form-label">
            Serial Number:
          </label>
          <input
            className="form-control"
            type="text"
            name="serialNumber"
            id="serialNumber"
            value={serialNumber}
            disabled={!isEditing}
            onChange={onInputChange}
          />
        </div>
        <div className="mb-1">
          <label htmlFor="status" className="form-label">
            Status:
          </label>
          <input
            className="form-control"
            type="text"
            name="status"
            id="status"
            value={status}
            disabled={!isEditing}
            onChange={onInputChange}
          />
        </div>
        <div className="mb-1">
          <label htmlFor="user" className="form-label">
            User:
          </label>
          <input
            className="form-control"
            type="text"
            name="user"
            id="user"
            value={user}
            disabled
          />
        </div>
      </form>
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
