import { useEffect, useState } from "react";
import useForm from "../../hooks/useForm";
import useAuth from "../../hooks/useAuth";
import Global from "../../helpers/Global";
import usePerson from "../../hooks/usePerson";
import { CircularProgress } from "@mui/material";

const InfoPerson = () => {
  const { personData, setUpdate } = usePerson();
  const [isEditing, setIsEditing] = useState(false);
  const { formState, onInputChange } = useForm({
    name: personData?.name || "",
    department: personData?.department || "",
    position: personData?.position || "",
    manager: personData?.manager || "",
  });
  const { auth } = useAuth();
  const { name, department, position, manager } = formState;
  const [loadin, setLoadin] = useState(false);

  useEffect(() => {}, [personData]);

  const handleEditClick = () => {
    setLoadin(true);
    setIsEditing(true);
    setLoadin(false);
  };

  const handleSaveClick = async () => {
    setLoadin(true);
    try {
      const token = localStorage.getItem("token");

      let itemToSave = { ...formState, userTI: auth._id };

      const request = await fetch(Global.url + "persons/" + personData._id, {
        method: "PATCH",
        body: JSON.stringify(itemToSave),
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      await request.json();

      setIsEditing(false);
      setLoadin(false);
      setUpdate(true);
    } catch (error) {
      setIsEditing(false);
    }
  };
  return (
    <div className="container glass m-2">
      {loadin ? (
        <div className="d-flex justify-content-center">
          <CircularProgress />
        </div>
      ) : (
        <>
          <form>
            <div className="mb-1">
              <label className="form-label" htmlFor="name">
                Nombre:
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
                Departamento:
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
                Posicion:
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
        </>
      )}
      <div>
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
  );
};

export default InfoPerson;
