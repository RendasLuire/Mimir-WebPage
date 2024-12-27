import "./CardInfoDevice.css";
import BackCard from "./BackCard";
import useDevice from "../../../hooks/useDevice";
import { useState } from "react";
import FrontCard from "./FrontCard";

const CardInfoDevice = () => {
  const { deviceData } = useDevice({});
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="flip-card">
      <div className={`flip-card-inner ${isFlipped ? "flipped" : ""}`}>
        <div className="flip-card-front">
          <FrontCard deviceData={deviceData} setIsFlipped={setIsFlipped} />
        </div>
        <div className="flip-card-back">
          <BackCard deviceData={deviceData} setIsFlipped={setIsFlipped} />
        </div>
      </div>
    </div>
  );
};

export default CardInfoDevice;
