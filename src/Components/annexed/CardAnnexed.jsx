import TextSnippetOutlinedIcon from "@mui/icons-material/TextSnippetOutlined";
import moment from "moment";
import { Link } from "react-router-dom";

moment.locale("es-mx");

const CardAnnexed = ({ annexed }) => {
  return (
    <Link
      to={`/inventory/annexeds/details/${annexed._id}`}
      className="card device-card w-100 glass m-1 d-flex flex-column align-items-center justify-content-center position-relative text-decoration-none"
    >
      <div className="glass m-2">
        <TextSnippetOutlinedIcon sx={{ width: 100, height: 100 }} />
      </div>
      <div className="card-body text-center">
        <h5 className="card-title">{annexed.number}</h5>
        <p className="card-text">{`Dispositivos: ${annexed.devices.length}`}</p>
        <p className="card-text">{`Fecha Inicio: ${moment(
          annexed.startDate
        ).format("L")}`}</p>
        <p className="card-text">
          {`Fecha Final: ${moment(annexed.endDate).format("L")}`}{" "}
        </p>
      </div>
    </Link>
  );
};

export default CardAnnexed;
