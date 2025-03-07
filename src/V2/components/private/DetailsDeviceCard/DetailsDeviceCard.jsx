import { useState } from "react";
import useDevice from "../../../hooks/useDevice";
import "./DetailsDeviceCard.css";
import { Snackbar } from "@mui/material";
import FrontCard from "./FrontCard";
import BackCard from "./BackCard";

const DetailsDeviceCard = () => {
  const { deviceData, setUpdate } = useDevice({});
  const [isFlipped, setIsFlipped] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="detaisDeviceCard">
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        message={message}
        key={"top" + "center"}
      />
      <div className={`flip-card-inner ${isFlipped ? "flipped" : ""}`}>
        <div className="flip-card-front">
          <FrontCard
            deviceData={deviceData}
            setIsFlipped={setIsFlipped}
            setOpen={setOpen}
            setMessage={setMessage}
          />
        </div>
        <div className="flip-card-back">
          <BackCard
            deviceData={deviceData}
            setIsFlipped={setIsFlipped}
            setOpen={setOpen}
            setMessage={setMessage}
            setUpdate={setUpdate}
          />
        </div>
      </div>
    </div>
  );
};

export default DetailsDeviceCard;
