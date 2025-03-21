import React, { useState } from "react";
import useDevice from "../../../hooks/useDevice";
import { Snackbar } from "@mui/material";
import "./NetworkCard.css";
import FrontCard from "./FrontCard";
import BackCard from "./BackCard";

const NetworkCard = () => {
  const { deviceData, setUpdate } = useDevice({});
  const [isFlipped, setIsFlipped] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const networkData = deviceData.network;

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className="container-info-network flip-card">
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        message={message}
        key={"top" + "center"}
      />
      <div className={`flip-card-inner ${isFlipped ? "flipped" : ""}`}>
        <div className="flip-card-front">
          <FrontCard networkData={networkData} setIsFlipped={setIsFlipped} />
        </div>
        <div className="flip-card-back">
          <BackCard
            setIsFlipped={setIsFlipped}
            setMessage={setMessage}
            setOpen={setOpen}
            setUpdate={setUpdate}
            networkData={networkData}
            deviceId={deviceData._id}
          />
        </div>
      </div>
    </div>
  );
};

export default NetworkCard;
