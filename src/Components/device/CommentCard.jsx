import moment from "moment/moment";
import { capitalizeFirstLetterOfEachWord } from "../../helpers/Tools";
import DeleteIcon from "@mui/icons-material/Delete";
import useDevice from "../../hooks/useDevice";
import Global from "../../helpers/Global";

const CommentCard = ({ data, isSent }) => {
  const { deviceData } = useDevice({});
  const handleDeleteButton = () => {
    try {
      const token = localStorage.getItem("token");

      const messageToSend = {
        id: deviceData._id,
        commentId: data._id,
      };

      const request = fetch(`${Global.url}`);
    } catch (error) {}
  };
  return (
    <div className={`message-card ${isSent ? "sent" : "received"}`}>
      <div
        className={`message-bubble ${
          isSent ? "bg-primary text-white" : "bg-light text-dark"
        }`}
      >
        {isSent && (
          <button
            type="button"
            className="btn btn-sm btn-link btn-delete btn-outline-danger "
            style={{ position: "absolute", top: "5px", right: "5px" }}
          >
            <DeleteIcon />
          </button>
        )}
        <div className="message-content">{data.content}</div>
        <div className="message-meta text-muted">
          <small>{moment(data.dateCreation).format("DD/MM/YYYY hh:mm")}</small>
          <small className="ms-2 text-truncate" style={{ maxWidth: "100px" }}>
            {capitalizeFirstLetterOfEachWord(data.nameUser)}
          </small>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
