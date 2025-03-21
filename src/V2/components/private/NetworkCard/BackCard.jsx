import React, { useEffect } from "react";
import { API } from "../../../utils/Urls";
import useAuth from "../../../hooks/useAuth";
import useForm from "../../../hooks/useForm";
import LanIcon from "@mui/icons-material/Lan";
import TextField from "@mui/material/TextField";

const BackCard = ({
  networkData,
  setIsFlipped,
  setOpen,
  setMessage,
  setUpdate,
  deviceId,
}) => {
  const { auth } = useAuth();
  const initialState = {
    ip: networkData?.ip || "000.000.000.000",
    macEthernet: networkData?.macEthernet || "00:00:00:00:00:00",
    macWifi: networkData?.macWifi || "00:00:00:00:00:00",
  };

  const { formState, onInputChange, setFormState } = useForm(initialState);

  const handleCancelClick = () => {
    setMessage("Cambios cancelados");
    setFormState(initialState);
    setOpen(true);
    setIsFlipped(false);
  };

  const formatIP = (value) => {
    let cleaned = value.replace(/[^0-9.]/g, "");
    let octets = cleaned.split(".");
    octets = octets.map((octet) => octet.slice(0, 3)).slice(0, 4);
    let formattedIP = octets.join(".");

    return formattedIP;
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

  const handleSaveClick = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const messageUpdate = {
      ...formState,
      user: auth._id,
    };

    try {
      const request = fetch(`${API.base}device/updateNetwork/${deviceId}`, {
        method: "PATCH",
        body: JSON.stringify(messageUpdate),
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      if (!request.ok) {
        setUpdate(true);
        setMessage("Error:" + request.statusText);
        setIsFlipped(false);
        setOpen(true);
      }
      setUpdate(true);
      setMessage("Cambios guardados");
      setIsFlipped(false);
      setOpen(true);
    } catch (error) {
      setMessage("Error", error);
      setOpen(true);
    }
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
