import React, { useState } from "react";
import useDevice from "../../../hooks/useDevice";
import Snackbar from "@mui/material/Snackbar";
import "./MonitorCard.css";
import FrontCard from "./FrontCard";
import BackCard from "./BackCard";

const MonitorCard = () => {
  const { deviceData, setUpdate } = useDevice({});
  const monitorData = deviceData.monitor?.id;
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className="flip-card container-info-monitor">
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        message={message}
        key={"top" + "center"}
      />
      <div className={`flip-card-inner ${isFlipped ? "flipped" : ""}`}>
        <div className="flip-card-front">
          <FrontCard monitorData={monitorData} setIsFlipped={setIsFlipped} />
        </div>
        <div className="flip-card-back">
          <BackCard
            monitorData={monitorData}
            setUpdate={setUpdate}
            setOpen={setOpen}
            setMessage={setMessage}
            setIsFlipped={setIsFlipped}
          />
        </div>
      </div>
    </div>
  );
};

export default MonitorCard;
