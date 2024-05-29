import { CircularProgress } from "@mui/material";
import useAuth from "../../../hooks/useAuth";
import Navbar from "./Navbar";
import { Outlet, Navigate, useLocation } from "react-router-dom";

const PrivateLayout = () => {
  const { auth, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="d-flex justify-content-center">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="d-flex">
      <Navbar />
      <div className="flex-grow-1 p-3 layout_content">
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
