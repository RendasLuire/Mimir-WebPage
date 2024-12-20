import { useState, useEffect } from "react";
import "./CardChatComments.css";

const CardChatComments = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const loggedInUserId = 1;

  useEffect(() => {
    const fetchComments = async () => {
      const response = await fetch("https://api.example.com/comments");
      const data = await response.json();
      setComments(data);
    };

    fetchComments();
  }, []);

  const handleAddComment = async () => {
    if (newComment.trim()) {
      const newMessage = {
        id: comments.length + 1,
        text: newComment,
        type: "user",
        userId: loggedInUserId,
      };
      setComments([newMessage, ...comments]);
      setNewComment("");
    }
  };

  const handleDeleteComment = (id) => {
    setComments(comments.filter((comment) => comment.id !== id));
  };

  return (
    <div className="card-chat">
      <div className="chat-comments">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className={`comment ${
              comment.type === "system"
                ? "system"
                : comment.userId === loggedInUserId
                ? "logged-in-user"
                : "other-user"
            }`}
          >
            <p>{comment.text}</p>
            {comment.userId === loggedInUserId && (
              <button
                className="btn btn-danger delete-btn"
                onClick={() => handleDeleteComment(comment.id)}
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
