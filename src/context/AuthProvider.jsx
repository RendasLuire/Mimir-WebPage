import { createContext, useEffect, useState } from "react";
import Global from "../helpers/Global";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [loading, setLoading] = useState(true);

  const authUser = async () => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (!token || !user) {
      return false;
    }

    const userObj = JSON.parse(user);
    const userId = userObj._id;

    const request = await fetch(Global.url + "users/" + userId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const data = await request.json();

    setAuth(data);
    setLoading(false);
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
