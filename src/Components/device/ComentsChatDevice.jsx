import { useEffect, useRef, useState } from "react";
import useDevice from "../../hooks/useDevice";
import CommentCard from "./CommentCard";
import AddCommentBar from "./AddCommentBar";
import useAuth from "../../hooks/useAuth";
import "../../styles/Devices/Chat_Omment.css";

const ComentsChatDevice = () => {
  const chatContainerRef = useRef(null);
  const { deviceData, setDeviceData } = useDevice({});
  const { auth } = useAuth();
  const [copiedMessage, setCopiedMessage] = useState(null); // Estado para manejar el mensaje copiado

  const handleDelete = async (commentId) => {
    try {
      const token = localStorage.getItem("token");

      const request = await fetch(
        `${Global.url}device/${deviceData._id}/comments/${commentId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      if (request.ok) {
        // Actualizar los comentarios después de la eliminación
        setDeviceData((prev) => ({
          ...prev,
          comments: prev.comments.filter(
            (comment) => comment._id !== commentId
          ),
        }));
      }
    } catch (error) {
      console.error("Error eliminando el comentario:", error);
    }
  };

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  const handleCopyToClipboard = (messageContent, messageId) => {
    navigator.clipboard.writeText(messageContent).then(() => {
      setCopiedMessage(messageId); // Guardamos el id del mensaje copiado
      setTimeout(() => setCopiedMessage(null), 2000); // Ocultamos la alerta después de 2 segundos
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [deviceData.comments]);

  return (
    <div className="card glass chat-card">
      <div className="card-header chat-header">Comentarios</div>
      <div className="card-body flex-grow-1 d-flex flex-column p-3">
        <div className="chat-container flex-grow-1" ref={chatContainerRef}>
          {deviceData.comments
            .slice(0)
            .reverse()
            .map((comment) => (
              <div key={comment._id} className="message-card">
                <CommentCard
                  data={comment}
                  isSent={
                    comment.nameUser.toUpperCase() === auth.name.toUpperCase()
                  }
                  handleDelete={handleDelete} // Pasamos la función de eliminación
                />
                {copiedMessage === comment._id && (
                  <div className="copied-alert show">Comentario copiado</div>
                )}
              </div>
            ))}
        </div>
        <div className="mt-3">
          <AddCommentBar />
        </div>
      </div>
    </div>
  );
};

export default ComentsChatDevice;
