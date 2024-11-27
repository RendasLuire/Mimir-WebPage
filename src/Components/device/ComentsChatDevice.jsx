import { useEffect, useRef } from "react";
import useDevice from "../../hooks/useDevice";
import CommentCard from "./CommentCard";
import AddCommentBar from "./AddCommentBar";
import useAuth from "../../hooks/useAuth";
import "../../styles/Chat_Omment.css";

const ComentsChatDevice = () => {
  const chatContainerRef = useRef(null);
  const { deviceData } = useDevice({});
  const { auth } = useAuth();

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [deviceData.comments]);

  return (
    <div className="card glass h-100 align-items-center justify-content-center position-relative text-decoration-none">
      <div className="card-header">Comentarios</div>
      <div className="card-body w-100 d-flex flex-column">
        <div
          className="container chat-container flex-grow-1 overflow-auto d-flex flex-column-reverse"
          ref={chatContainerRef}
        >
          {deviceData.comments
            .slice(0)
            .reverse()
            .map((comment) => (
              <CommentCard
                key={comment._id}
                data={comment}
                isSent={
                  comment.nameUser.toUpperCase() === auth.name.toUpperCase()
                }
              />
            ))}
        </div>
        <div className="mt-2">
          <AddCommentBar />
        </div>
      </div>
    </div>
  );
};

export default ComentsChatDevice;
