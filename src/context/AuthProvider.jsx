import { createContext, useEffect, useState } from "react";
import Global from "../helpers/Global";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  const authUser = async () => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (!token || !user) {
      return false;
    }

    const userObj = JSON.parse(user);
    const userId = userObj.id;

    const request = await fetch(Global.url + "users/" + userId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const data = await request.json();

    setAuth(data.user);
  };

  useEffect(() => {
    authUser();
  }, []);

  return (
    <AuthContext.Provider value={(auth, setAuth)}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
