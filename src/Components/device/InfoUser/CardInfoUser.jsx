import "./CardInfoUser.css";
import useDevice from "../../../hooks/useDevice";
import FrontCard from "./FrontCard";
import Snackbar from "@mui/material/Snackbar";
import { useState } from "react";
import BackCard from "./BackCard";

const CardInfoUser = () => {
  const { deviceData } = useDevice({});
  const [isFlipped, setIsFlipped] = useState(false);
  const userData = deviceData.person?.id;
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

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
          <FrontCard userData={userData} setIsFlipped={setIsFlipped} />
        </div>
        <div className="flip-card-back">
          <BackCard userData={userData} setFlipped={setIsFlipped} />
        </div>
      </div>
    </div>
  );
};

export default CardInfoUser;
