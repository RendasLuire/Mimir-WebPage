import React, { useState, useEffect } from "react";
import "./CardChatComments.css";

const CardChatComments = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    // Simulando la llamada a la API para obtener comentarios
    const fetchComments = async () => {
      const response = await fetch("https://api.example.com/comments");
      const data = await response.json();
      setComments(data);
    };

    fetchComments();
  }, []);

  const handleAddComment = async () => {
    if (newComment.trim()) {
      // Simulamos un comentario nuevo y lo agregamos al array
      const newMessage = {
        id: comments.length + 1,
        text: newComment,
        type: "user",
      };
      setComments([newMessage, ...comments]);
      setNewComment("");

      // Aquí podrías enviar el comentario a la API
      // await fetch("https://api.example.com/comments", { method: "POST", body: JSON.stringify(newMessage) });
    }
  };

  const handleDeleteComment = (id) => {
    setComments(comments.filter((comment) => comment.id !== id));
    // Aquí podrías realizar la llamada a la API para borrar el comentario
    // await fetch(`https://api.example.com/comments/${id}`, { method: "DELETE" });
  };

  return (
    <div className="card-chat">
      <div className="chat-comments">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className={`comment ${
              comment.type === "system" ? "system" : "user"
            }`}
          >
            <p>{comment.text}</p>
            <button
              className="btn btn-danger delete-btn"
              onClick={() => handleDeleteComment(comment.id)}
            >
              Eliminar
            </button>
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
