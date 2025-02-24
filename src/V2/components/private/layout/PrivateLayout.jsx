import { Navigate, Outlet, useLocation } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import "./PrivateLayout.css";
import useAuth from "../../../hooks/useAuth";
import Navbar from "../Navbar/Navbar";

const PrivateLayout = () => {
  const { auth, loading } = useAuth();
  const location = useLocation();

  return (
    <div className="privateLayout">
      {loading ? (
        <div className="d-flex justify-content-center align-items-center w-100 h-100">
          <div className="card">
            <div className="card-header">
              <CircularProgress />
            </div>
            <div className="card-body">
              <h1 className="card-title">Cargando...</h1>
            </div>
          </div>
        </div>
      ) : (
        <div className="d-flex h-100">
          <Navbar />
          <div className="layout_content">
            {auth._id ? (
              <Outlet />
            ) : (
              <Navigate to={"/login"} state={{ from: location }} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PrivateLayout;
