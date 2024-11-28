import SendIcon from "@mui/icons-material/Send";
import useForm from "../../hooks/useForm";
import useAuth from "../../hooks/useAuth";
import Global from "../../helpers/Global";
import useDevice from "../../hooks/useDevice";
import "../../styles/Devices/Chat_Omment.css";

const AddCommentBar = () => {
  const { formState, setFormState, onInputChange } = useForm({
    content: "",
  });
  const { deviceData, setUpdate } = useDevice({});
  const { auth } = useAuth();

  const handleSendClick = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const messageToSend = {
        ...formState,
        user: auth._id,
        nameUser: auth.name,
      };

      const request = await fetch(
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

      if (request.ok) {
        setUpdate(true);
        setFormState({ content: "" });
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <div className="add-comment-bar">
      <input
        type="text"
        className="form-control me-2"
        placeholder="Escribe un comentario..."
        name="content"
        id="content"
        value={formState.content}
        onChange={onInputChange}
      />
      <button className="btn btn-outline-primary" onClick={handleSendClick}>
        <SendIcon />
      </button>
    </div>
  );
};

export default AddCommentBar;
