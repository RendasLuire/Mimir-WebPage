import React, { useState } from "react";
import { Snackbar } from "@mui/material";
import useDevice from "../../../hooks/useDevice";
import "./OfficeCard.css";
import FrontCard from "./FrontCard";
import BackCard from "./BackCard";

const OfficeCard = () => {
  const { deviceData, setUpdate } = useDevice({});
  const [isFlipped, setIsFlipped] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const officeData = deviceData.office;

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="flip-card">
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        message={message}
        key={"top" + "center"}
      />
      <div className={`flip-card-inner ${isFlipped ? "flipped" : ""}`}>
        <div className="flip-card-front">
          <FrontCard officeData={officeData} setIsFlipped={setIsFlipped} />
        </div>
        <div className="flip-card-back">
          <BackCard
            setIsFlipped={setIsFlipped}
            setMessage={setMessage}
            setOpen={setOpen}
            setUpdate={setUpdate}
            officeData={officeData}
            deviceId={deviceData._id}
          />
        </div>
      </div>
    </div>
  );
};

export default OfficeCard;
