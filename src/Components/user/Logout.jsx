import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear();

    setAuth({});

    navigate("/login");
  }, [setAuth, navigate]);

  return (
    <div className="container">
      <h1>Cerrando Sesion...</h1>
    </div>
  );
};

export default Logout;
