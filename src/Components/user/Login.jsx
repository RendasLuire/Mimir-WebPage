import { useState } from "react";
import Alert from "@mui/material/Alert";
import Global from "../../helpers/Global";
import useForm from "../../hooks/useForm";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const { formState, onInputChange } = useForm({});
  const [login, setLogin] = useState();
  const { setAuth } = useAuth();

  const loginUser = async (e) => {
    e.preventDefault();

    let userToLogin = formState;

    const request = await fetch(Global.url + "users/login", {
      method: "POST",
      body: JSON.stringify(userToLogin),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await request.json();

    if (data.message == "Login correcto.") {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setLogin("login");

      setAuth(data.user);
    } else {
      setLogin("error");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card glass" style={{ maxWidth: "400px" }}>
        <div className="card-body">
          <h5 className="card-title text-center">Login</h5>
          {login == "login" ? (
            <Alert severity="success">Credenciales correctas</Alert>
          ) : (
            ""
          )}
          {login == "error" ? (
            <Alert severity="error">Credenciales invalidas</Alert>
          ) : (
            ""
          )}
          <form onSubmit={loginUser}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Usuario:{" "}
              </label>
              <input
                id="username"
                name="nickname"
                className="form-control"
                type="text"
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Contraseña:{" "}
              </label>
              <input
                id="password"
                name="password"
                className="form-control"
                type="password"
                onChange={onInputChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Iniciar Sesion
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
