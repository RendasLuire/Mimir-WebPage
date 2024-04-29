import { useEffect, useState } from "react";
import useForm from "../../hooks/useForm";
import useAuth from "../../hooks/useAuth";
import Global from "../../helpers/Global";
import usePerson from "../../hooks/usePerson";
import { CircularProgress } from "@mui/material";

const InfoPerson = () => {
  const { personInfo } = usePerson();
  const [isEditing, setIsEditing] = useState(false);
  const { formState, onInputChange } = useForm({
    name: personInfo?.name || "",
    department: personInfo?.department || "",
    position: personInfo?.position || "",
    manager: personInfo?.manager || "",
  });
  const { auth } = useAuth();
  const { name, department, position, manager } = formState;
  const [login, setLogin] = useState(false);

  useEffect(() => {}, [personInfo]);

  const handleEditClick = () => {
    setLogin(true);
    setIsEditing(true);
    setLogin(false);
  };

  const handleSaveClick = async () => {
    setLogin(true);
    try {
      const token = localStorage.getItem("token");

      let itemToSave = { ...formState, userTI: auth._id };

      const request = await fetch(Global.url + "persons/" + personInfo._id, {
        method: "PATCH",
        body: JSON.stringify(itemToSave),
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      await request.json();

      setIsEditing(false);
      setLogin(false);
    } catch (error) {
      setIsEditing(false);
    }
  };
  return (
    <div className="container glass m-2">
      {login ? (
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
