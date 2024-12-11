import { CircularProgress } from "@mui/material";
import useAuth from "../../../hooks/useAuth";
import Navbar from "./navbar/Navbar";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import "../../../styles/Layout_Styles.css";

const PrivateLayout = () => {
  const { auth, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center h-100">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="d-flex h-100">
      <Navbar />
      <div className="layout_content w-100">
        {auth._id ? (
          <Outlet />
        ) : (
          <Navigate to="/login" state={{ from: location }} />
        )}
      </div>
    </div>
  );
};

export default PrivateLayout;
