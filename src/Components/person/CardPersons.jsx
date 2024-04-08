import PersonIcon from "@mui/icons-material/Person";
import CircleIcon from "@mui/icons-material/Circle";

const CardPersons = ({ user }) => {
  const { _id } = user;
  return (
    <>
      <button
        type="button"
        data-bs-target={`#${_id}`}
        data-bs-toggle="modal"
        className="card w-100 glass m-1 d-flex flex-column align-items-center justify-content-center position-relative"
      >
        <div className="glass m-2">
          <PersonIcon sx={{ width: 150, height: 150 }} />
        </div>
        <div className="position-absolute top-0 start-0">
          <CircleIcon />
        </div>
        <div className="card-body text-center"></div>
      </button>
    </>
  );
};

export default CardPersons;
