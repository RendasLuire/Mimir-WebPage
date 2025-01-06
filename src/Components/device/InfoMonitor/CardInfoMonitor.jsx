import "./CardInfoMonitor.css";
import useDevice from "../../../hooks/useDevice";
import { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import FrontCard from "./FrontCard";
import BackCard from "./BackCard";

const cardInfoMonitor = () => {
  const { deviceData, setUpdate } = useDevice({});
  const monitorData = deviceData.monitor?.id;
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isFlipped, setIsFlipped] = useState(false);

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
          <FrontCard monitorData={monitorData} setIsFlipped={setIsFlipped} />
        </div>
        <div className="flip-card-back">
          <BackCard
            monitorData={monitorData}
            setFlipped={setIsFlipped}
            setMessage={setMessage}
            setOpen={setOpen}
            setUpdate={setUpdate}
            device={deviceData._id}
            user={deviceData.person}
          />
        </div>
      </div>
    </div>
  );
};

export default cardInfoMonitor;
