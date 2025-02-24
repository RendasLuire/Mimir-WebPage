import { CircularProgress } from "@mui/material";
import "./LoadingCard.css";

const LoadingCard = () => {
  return (
    <div className="loading">
      <div className="card">
        <div className="card-header">
          <CircularProgress />
        </div>
        <div className="card-body">
          <h5 className="card-title">Cargando...</h5>
        </div>
      </div>
    </div>
  );
};

export default LoadingCard;
