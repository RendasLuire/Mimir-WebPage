import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import "../../styles/Devices/Chat_Omment.css";

const CommentCard = ({ data, isSent, handleDelete }) => {
  const [showAlert, setShowAlert] = useState(false);

  const handleClickDelete = (e) => {
    e.stopPropagation();
    handleDelete(data._id);
  };

  const handleAlert = () => {
    navigator.clipboard.writeText(data.content);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  };

  return (
    <div className="message-card">
      <div
        className={`message-bubble ${isSent ? "sent" : "received"}`}
        onClick={handleAlert} // Función para mostrar la alerta
      >
        {data.content}
        {showAlert && (
          <div className="copied-alert show">Comentario copiado</div>
        )}
        {isSent && (
          <button className="btn-delete" onClick={handleClickDelete}>
            <DeleteIcon />
          </button>
        )}
      </div>
    </div>
  );
};

export default CommentCard;
