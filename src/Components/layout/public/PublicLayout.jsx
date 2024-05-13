import Header from "./Header";
import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { CircularProgress } from "@mui/material";

const PublicLayout = () => {
  const { auth, loading } = useAuth();

  if (loading) {
    return (
      <div className="d-flex justify-content-center">
        <CircularProgress />
      </div>
    );
  }

  return (
    <>
      <Header />
      <section className="layout_content">
        {auth._id && window.location.pathname === "/login" ? (
          <Navigate to="/inventory/devices" />
        ) : (
          <Outlet />
        )}
      </section>
    </>
  );
};

export default PublicLayout;
