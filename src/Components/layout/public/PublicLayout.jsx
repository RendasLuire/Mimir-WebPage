import Header from "./Header";
import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const PublicLayout = () => {
  const { auth } = useAuth();

  return (
    <>
      <Header />
      <section className="layout_content">
        {!auth._id ? <Outlet /> : <Navigate to="/inventory/devices" />}
      </section>
    </>
  );
};

export default PublicLayout;
