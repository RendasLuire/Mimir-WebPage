import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";

const BackCard = ({ deviceData, setIsFlipped }) => {
  const handleSaveClick = () => {
    setIsFlipped(false);
  };

  const handleCancelClick = () => {
    setIsFlipped(false);
  };
  return (
    <div className="card">
      <div className="icon card-img-top card-header"></div>
      <div className="card-body">
        <form>
          <TextField
            id="hostname"
            label="Hostname"
            variant="standard"
            className="form-control"
          />
          <TextField
            id="brand"
            label="Marca"
            variant="standard"
            className="form-control"
          />
          <TextField
            id="model"
            label="Modelo"
            variant="standard"
            className="form-control"
          />
          <TextField
            id="serialNumber"
            label="Numero de Serie"
            variant="standard"
            className="form-control"
          />
          <TextField
            id="annexed"
            label="Anexo"
            variant="standard"
            className="form-control"
          />
          <InputLabel id="demo-simple-select-label1">algo</InputLabel>
          <Select
            labelId="demo-simple-select-label1"
            id="demo-simple-select"
            label="Complejo"
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
          <InputLabel id="demo-simple-select-label2">algo</InputLabel>
          <Select
            labelId="demo-simple-select-label2"
            id="demo-simple-select"
            label="Edificio"
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
          <InputLabel id="demo-simple-select-label3">algo</InputLabel>
          <Select
            labelId="demo-simple-select-label3"
            id="demo-simple-select"
            label="Ubicacion"
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </form>
      </div>
      <div className="btn-group card-footer">
        <button
          className="btn btn-primary"
          type="button"
          onClick={handleSaveClick}
        >
          Guardar
        </button>
        <button
          className="btn btn-danger"
          type="button"
          onClick={handleCancelClick}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default BackCard;
