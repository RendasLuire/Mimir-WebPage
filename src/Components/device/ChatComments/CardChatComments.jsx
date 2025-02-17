import { useState, useEffect } from "react";
import "./CardChatComments.css";
import useDevice from "../../../hooks/useDevice";
import Global from "../../../helpers/Global";
import useAuth from "../../../hooks/useAuth";

const CardChatComments = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { deviceData } = useDevice({});
  const { auth } = useAuth();
  const loggedInUserId = 1;

  useEffect(() => {
    if (deviceData?.comments) {
      setComments(deviceData.comments);
    }
  }, [deviceData]);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      const token = localStorage.getItem("token");
      const messageToSend = {
        content: newComment,
        user: auth._id,
        nameUser: auth.name,
      };

      const response = await fetch(
        `${Global.url}device/${deviceData._id}/comments`,
        {
          method: "POST",
          body: JSON.stringify(messageToSend),
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      if (response.ok) {
        const savedComment = await response.json();

        // Agrega el nuevo comentario a la lista y limpia el input
        setComments([...comments, savedComment]);
        setNewComment("");

        // Espera un pequeño tiempo y hace scroll automático al último mensaje
        setTimeout(() => {
          const chatContainer = document.querySelector(".chat-comments");
          chatContainer.scrollTop = chatContainer.scrollHeight;
        }, 100);
      } else {
        console.error("Error al guardar el comentario.");
      }
    } catch (error) {
      console.error("Error en la petición:", error);
    }
  };

  const handleDeleteComment = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/device/${
          deviceData._id
        }/comments/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.ok) {
        setComments(comments.filter((comment) => comment._id !== id));
      } else {
        console.error("Error al eliminar el comentario.");
      }
    } catch (error) {
      console.error("Error en la petición:", error);
    }
  };

  return (
    <div className="card-chat">
      <div className="chat-comments">
        {comments.map((comment) => (
          <div
            key={comment._id}
            className={`comment ${
              comment.type === "system"
                ? "system"
                : comment.user === loggedInUserId
                ? "logged-in-user"
                : "other-user"
            }`}
          >
            <p>{comment.content}</p>
            {comment.user === loggedInUserId && (
              <button
                className="btn btn-danger delete-btn"
                onClick={() => handleDeleteComment(comment._id)}
              >
                Eliminar
              </button>
            )}
          </div>
        ))}
      </div>
      <div className="comment-input">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Escribe un comentario..."
        />
        <button onClick={handleAddComment} className="btn btn-primary">
          Enviar
        </button>
      </div>
    </div>
  );
};

export default CardChatComments;
