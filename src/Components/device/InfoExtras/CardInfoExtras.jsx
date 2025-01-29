import { useState } from "react";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import MouseIcon from "@mui/icons-material/Mouse";
import CableIcon from "@mui/icons-material/Cable";
import PestControlRodentIcon from "@mui/icons-material/PestControlRodent";
import "./CardInfoExtras.css";
import CardSmall from "./CardSmall";

const CardInfoExtras = () => {
  const initialCards = [
    { id: 1, icon: HeadphonesIcon, date: "2025-01-01" },
    { id: 2, icon: MouseIcon, date: "2025-01-02" },
    { id: 3, icon: CableIcon, date: "2025-01-03" },
    { id: 4, icon: PestControlRodentIcon, date: "2025-01-04" },
  ];

  return (
    <div className="container-info-extras">
      {initialCards.map((card) => (
        <CardSmall
          key={card.id}
          icon={card.icon}
          date={card.date}
          onEdit={(newDate) => console.log(`Edit card ${card.id}: ${newDate}`)}
          active={false}
        />
      ))}
    </div>
  );
};

export default CardInfoExtras;
