import useAuth from "../../../hooks/useAuth";
import Navbar from "./Navbar";
import { Outlet, Navigate } from "react-router-dom";

const PrivateLayout = () => {
  const { auth } = useAuth();

  return (
    <>
      <Navbar />
      <section className="layout_content">
        {auth._id ? <Outlet /> : <Navigate to="/login" />}
      </section>
    </>
  );
};

export default PrivateLayout;
