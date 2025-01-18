import React, { useEffect } from "react";
import LanIcon from "@mui/icons-material/Lan";
import TextField from "@mui/material/TextField";
import useForm from "../../../hooks/useForm";

const BackCard = ({
  networkData,
  setIsFlipped,
  setOpen,
  setMessage,
  setUpdate,
}) => {
  const initialState = {
    ip: networkData?.ip || "",
    macEthernet: networkData?.macEthernet || "",
    macWifi: networkData?.macWifi || "",
  };

  const { formState, onInputChange, setFormState } = useForm(initialState);

  const handleCancelClick = () => {
    setMessage("Cambios cancelados");
    setFormState(initialState);
    setIsFlipped(false);
    setOpen(true);
  };

  const formatIP = (value) => {
    return (
      value
        .replace(/[^\d]/g, "")
        .match(/(\d{1,3})/g)
        ?.join(".")
        .substring(0, 15) || ""
    );
  };

  const formatMAC = (value) => {
    return (
      value
        .replace(/[^\da-fA-F]/g, "")
        .match(/.{1,2}/g)
        ?.join(":")
        .substring(0, 17) || ""
    );
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    let formattedValue = value;

    if (name === "ip") {
      formattedValue = formatIP(value);
    } else if (name === "macEthernet" || name === "macWifi") {
      formattedValue = formatMAC(value);
    }

    onInputChange({
      target: {
        name,
        value: formattedValue,
      },
    });
  };

  useEffect(() => {
    setFormState(initialState);
  }, [networkData]);

  return (
    <div className="card">
      <div className="icon card-img-top card-header">
        <LanIcon sex={{ height: 70, width: 70 }} />
      </div>
      <div className="card-body">
        <form className="form-card-back">
          <TextField
            id="ip"
            label="IP"
            variant="standard"
            className="form-control"
            value={formState.ip}
            onChange={handleInputChange}
            name="ip"
          />
          <TextField
            id="macEthernet"
            label="MAC Ethernet"
            variant="standard"
            className="form-control"
            value={formState.macEthernet}
            onChange={handleInputChange}
            name="macEthernet"
          />
          <TextField
            id="macWifi"
            label="MAC WIFI"
            variant="standard"
            className="form-control"
            value={formState.macWifi}
            onChange={handleInputChange}
            name="macWifi"
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
        <button type="button" className="btn btn-primary">
          Guardar
        </button>
      </div>
    </div>
  );
};

export default BackCard;
