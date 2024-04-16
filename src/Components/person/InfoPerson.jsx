import { useEffect, useState } from "react";
import useForm from "../../hooks/useForm";
import useAuth from "../../hooks/useAuth";
import Global from "../../helpers/Global";
import usePerson from "../../hooks/usePerson";

const InfoPerson = () => {
  const { personInfo } = usePerson();
  const [isEditing, setIsEditing] = useState(false);
  const { formState, onInputChange, setFormState } = useForm({
    name: personInfo?.name || "",
    department: personInfo?.department || "",
    position: personInfo?.position || "",
    manager: personInfo?.manager || "",
  });
  const { auth } = useAuth();
  const { name, department, position, manager } = formState;

  useEffect(() => {
    setFormState({
      name: personInfo?.name || "",
      department: personInfo?.department || "",
      position: personInfo?.position || "",
      manager: personInfo?.manager || "",
    });
  }, [personInfo, setFormState]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    const token = localStorage.getItem("token");

    let itemToSave = formState;
    itemToSave.userTI = auth._id;

    const request = await fetch(
      Global.url + "persons/update/" + itemToSave._id,
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
    <div className="container m-2">
      <form>
        <div className="mb-1">
          <label className="form-label" htmlFor="name">
            Name:
          </label>
          <input
            className="form-control"
            type="text"
            name="name"
            id="name"
            value={name}
            disabled={!isEditing}
            onChange={onInputChange}
          />
        </div>
        <div className="mb-1">
          <label className="form-label" htmlFor="demartment">
            Department:
          </label>
          <input
            className="form-control"
            type="text"
            name="department"
            id="department"
            value={department}
            disabled={!isEditing}
            onChange={onInputChange}
          />
        </div>
        <div className="mb-1">
          <label className="form-label" htmlFor="position">
            Position:
          </label>
          <input
            className="form-control"
            type="text"
            name="position"
            id="position"
            value={position}
            disabled={!isEditing}
            onChange={onInputChange}
          />
        </div>
        <div className="mb-1">
          <label className="form-label" htmlFor="manager">
            Manager:
          </label>
          <input
            className="form-control"
            type="text"
            name="position"
            value={manager.managerName}
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

export default InfoPerson;
