import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DevicesIcon from "@mui/icons-material/Devices";
import ComputerOutlinedIcon from "@mui/icons-material/ComputerOutlined";
import InputLabel from "@mui/material/InputLabel";
import useForm from "../../../hooks/useForm";

const iconMap = {
  desktop: <DevicesIcon sx={{ width: 50, height: 50 }} />,
  laptop: <ComputerOutlinedIcon sx={{ width: 50, height: 50 }} />,
};

const BackCard = (deviceData, setIsFlipped, setOpen, setMessage, setUpdate) => {
  const [complex, setComplex] = useState("");
  const [building, setBuilding] = useState("");
  const [ubication, setUbication] = useState("");
  const [ubicationText, setUbicationText] = useState("");
  const [bussinesUnit, setBussinesUnit] = useState("");
  const [storages, setStorages] = useState([]);
  const icon = iconMap[deviceData.typeDevice] || null;

  const initialState = {
    hostname: deviceData.hostname || "",
    serialNumber: deviceData.serialNumber || "",
    brand: deviceData.brand || "",
    model: deviceData.model || "",
    details: deviceData.details || "",
    annexed: deviceData.annexed?.number || "",
    custom: deviceData.custom || false,
    headphones: deviceData.headphones || false,
    adaptVGA: deviceData.adaptVGA || false,
    mouse: deviceData.mouse || false,
    complejo: deviceData.complejo || "",
    edificio: deviceData.edificio || "",
    ubicacion: deviceData.ubicacion || "",
    status: deviceData.status || "",
  };

  const { formState, onInputChange, setFormState } = useForm(initialState);
  const [listSettings, setListSettings] = useState([]);

  const handleCancelClick = () => {
    setMessage("Cambios cancelados");
    setFormState(initialState);
    setIsFlipped(false);
    setOpen(true);
  };

  const handleComplexChange = (e) => {
    const [complexId, complexText] = e.target.value.split("|");
    setComplex(complexId);
    setBussinesUnit(complexText);
    setBuilding("");
    setUbication("");
    setUbicationText("");
  };

  const handleBuildingChange = (e) => {
    setBuilding(e.target.value);
    setUbication("");
    setUbicationText("");
  };

  const handleUbicationChange = (e) => {
    const [ubicationId, completeText] = e.target.value.split("|");
    setUbication(ubicationId);
    setUbicationText(completeText);
    setBussinesUnit(bussinesUnit);
  };

  return (
    <div className="card">
      <div className="icon card-img-top card-header">{icon}</div>
      <div className="card-body">
        <form className="form-card-back">
          <TextField
            id="hostname"
            label="Hostname"
            variant="standard"
            className="form-control"
            value={formState.hostname}
            onChange={onInputChange}
            name="hostname"
          />
          <TextField
            id="brand"
            label="Marca"
            variant="standard"
            className="form-control"
            value={formState.brand}
            onChange={onInputChange}
            name="brand"
          />
          <TextField
            id="model"
            label="Modelo"
            variant="standard"
            className="form-control"
            value={formState.model}
            onChange={onInputChange}
            name="model"
          />
          <TextField
            id="serialNumber"
            label="Numero de Serie"
            variant="standard"
            className="form-control"
            value={formState.serialNumber}
            onChange={onInputChange}
            name="serialNumber"
          />
          <TextField
            id="annexed"
            label="Anexo"
            variant="standard"
            className="form-control"
            value={formState.annexed}
            onChange={onInputChange}
            name="annexed"
          />
          <FormControlLabel
            control={
              <Switch
                checked={formState.custom}
                onChange={(e) =>
                  setFormState({ ...formState, custom: e.target.checked })
                }
              />
            }
            label={formState.custom ? "Propio" : "Compartido"}
          />
          <InputLabel id="status-label">Estatus</InputLabel>
          <Select
            labelId="status-label"
            id="status"
            value={formState.status?.value || ""}
            onChange={(e) => {
              const selectedStatus = listSettings.find(
                (status) => status.value === e.target.value
              );
              setFormState({
                ...formState,
                status: selectedStatus
                  ? { value: selectedStatus.value, label: selectedStatus.label }
                  : "",
              });
            }}
            name="status"
            variant="standard"
            className="form-control"
          >
            <MenuItem value="">Selecciona un estatus...</MenuItem>
            {listSettings.map((status) => (
              <MenuItem key={status.value} value={status.value}>
                {status.label}
              </MenuItem>
            ))}
          </Select>
          <InputLabel id="complejo-label">Complejo</InputLabel>
          <Select
            labelId="complejo-label"
            id="complex"
            value={`${complex}|${bussinesUnit}`}
            onChange={handleComplexChange}
            name="complex"
            variant="standard"
            className="form-control"
          >
            <MenuItem value="">Selecciona un complejo...</MenuItem>
            {storages.map((item) => (
              <MenuItem key={item._id} value={`${item._id}|${item.complex}`}>
                {item.complex}
              </MenuItem>
            ))}
          </Select>
          <InputLabel id="edificio-label">Edificio</InputLabel>
          <Select
            labelId="edificio-label"
            id="building"
            value={building}
            onChange={handleBuildingChange}
            name="building"
            variant="standard"
            className="form-control"
            disabled={!complex}
          >
            <MenuItem value="">Selecciona un edificio...</MenuItem>
            {storages
              .filter((item) => item._id === complex)
              .flatMap((item) =>
                item.buildings.map((bld) => (
                  <MenuItem key={bld._id} value={bld._id}>
                    {bld.name}
                  </MenuItem>
                ))
              )}
          </Select>
          <InputLabel id="ubicacion-label">Ubicacion</InputLabel>
          <Select
            labelId="ubicacion-label"
            id="place"
            value={`${ubication}|${ubicationText}`}
            onChange={handleUbicationChange}
            name="place"
            variant="standard"
            className="form-control"
            disabled={!building}
          >
            <MenuItem value="">Selecciona una ubicación...</MenuItem>
            {storages
              .filter((item) => item._id === complex)
              .flatMap((item) =>
                item.buildings
                  .filter((bld) => bld._id === building)
                  .flatMap((bld) =>
                    bld.ubications.map((place) => (
                      <MenuItem
                        key={place._id}
                        value={`${place._id}|${place.complete}`}
                      >
                        {place.ubication}
                      </MenuItem>
                    ))
                  )
              )}
          </Select>
        </form>
      </div>
      <div className="btn-group card-footer">
        <button className="btn btn-primary" type="button">
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
