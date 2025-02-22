import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { API } from "../utils/Urls.js";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const authUser = async () => {
    try {
      const localToken = localStorage.getItem("token");
      const localUser = localStorage.getItem("user");

      if (!localToken || !localUser) {
        setError("Token o usuario no encontrados en el almacenamiento local");
        setLoading(false);
        return;
      }

      const userObj = JSON.parse(localUser);
      const userId = userObj?._id;

      if (!userId) {
        setError("Id de usuario no válido");
        setLoading(false);
        return;
      }

      const request = await fetch(`${API.users}/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: localToken,
        },
      });

      if (!request.ok) {
        setError("Error al obtener detalles del usuario");
        setLoading(false);
        return;
      }

      const response = await request.json();
      setAuth(response.data);
      setLoading(false);
    } catch (error) {
      setError(`Error de autenticación: ${error.message}`);
      setLoading(false);
    }
  };

  useEffect(() => {
    authUser();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthProvider, AuthContext };
