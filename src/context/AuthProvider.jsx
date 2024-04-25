import { createContext, useEffect, useState } from "react";
import Global from "../helpers/Global";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [loading, setLoading] = useState(true);

  const authUser = async () => {
    try {
      const tokenLocal = localStorage.getItem("token");
      const userLocal = localStorage.getItem("user");

      if (!tokenLocal || !userLocal) {
        throw new Error(
          "Token o usuario no encontrados en el almacenamiento local"
        );
      }

      const userObj = JSON.parse(userLocal);
      const userId = userObj._id;

      const request = await fetch(Global.url + "user/" + userId, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: tokenLocal,
        },
      });

      if (!request.ok) {
        throw new Error("Error al obtener detalles del usuario");
      }

      const response = await request.json();

      const { data } = response;

      setAuth(data);
      setLoading(false);
    } catch (error) {
      console.error("Error de autenticación:", error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    authUser();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
