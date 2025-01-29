import Global from "../../../helpers/Global";
import useAuth from "../../../hooks/useAuth";
import useForm from "../../../hooks/useForm";
import officeIcon from "../../../icons/office.ico";
import TextField from "@mui/material/TextField";

const BackCard = ({
  officeData,
  setIsFlipped,
  setOpen,
  setMessage,
  setUpdate,
  deviceId,
}) => {
  const { auth } = useAuth();
  const initialState = {
    officeVersion: officeData?.officeVersion || "Dummy",
    officeKey: officeData?.officeKey || "XXXX-XXXX-XXXX-XXXX",
  };

  const { formState, onInputChange, setFormState } = useForm(initialState);

  const formatOfficeKey = (value) => {
    const sanitized = value.replace(/[^a-zA-Z0-9]/g, "");
    return sanitized.match(/.{1,5}/g)?.join("-") || sanitized;
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const formattedValue =
      name === "officeKey" ? formatOfficeKey(value) : value;
    onInputChange({ target: { name, value: formattedValue } });
  };

  const handleCancelClick = () => {
    setMessage("Cambios cancelados");
    setFormState(initialState);
    setIsFlipped(false);
    setOpen(true);
  };

  const handleSaveClick = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const messageUpdate = {
      ...formState,
      user: auth._id,
    };

    try {
      const request = await fetch(
        `${Global.url}device/updateOffice/${deviceId}`,
        {
          method: "PATCH",
          body: JSON.stringify(messageUpdate),
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      const response = await request.json();

      if (request.ok) {
        setUpdate(true);
        setMessage("Cambios guardados");
        setIsFlipped(false);
        setOpen(true);
      } else {
        setUpdate(true);
        setMessage(response.message);
        setIsFlipped(false);
        setOpen(true);
      }
    } catch (error) {
      setMessage("Error", error);
      setOpen(true);
    }
  };

  return (
    <div className="card">
      <div className="icon card-img-top card-header">
        <img src={officeIcon} alt="Office" />
      </div>
      <div className="card-body">
        <form className="form-card-back">
          <TextField
            id="officeVersion"
            label="Version de Office"
            variant="standard"
            className="form-control"
            value={formState.officeVersion}
            onChange={handleInputChange}
            name="officeVersion"
          />
          <TextField
            id="officeKey"
            label="Key de activacion"
            variant="standard"
            className="form-control"
            value={formState.officeKey}
            onChange={handleInputChange}
            name="officeKey"
          />
        </form>
      </div>
      <div className="card-footer btn-group">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleCancelClick}
        >
          Cancelar
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleSaveClick}
        >
          Guardar
        </button>
      </div>
    </div>
  );
};

export default BackCard;
