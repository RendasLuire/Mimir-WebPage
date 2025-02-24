import { CircularProgress } from "@mui/material";
import NavBar from "../navbar/NavBar";
import "./PublicLayout.css";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { useEffect } from "react";

const PublicLayout = () => {
  const { auth, loading } = useAuth();

  useEffect(() => {
    if (auth._id && window.location.pathname === "/login") {
      return;
    }
  }, [auth]);

  return (
    <div className="publicLayout">
      <NavBar />
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
        <div className="layout_content">
          {auth._id && window.location.pathname === "/login" ? (
            <Navigate to={"/inventory/devices/"} />
          ) : (
            <Outlet />
          )}
        </div>
      )}
    </div>
  );
};

export default PublicLayout;
