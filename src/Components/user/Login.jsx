import { useState } from "react";
import Alert from "@mui/material/Alert";
import Global from "../../helpers/Global";
import useForm from "../../hooks/useForm";
import useAuth from "../../hooks/useAuth";
import PsychologyIcon from "@mui/icons-material/Psychology";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { formState, onInputChange } = useForm({});
  const [login, setLogin] = useState({ code: null, message: "" });
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();

    let userToLogin = formState;

    try {
      const request = await fetch(Global.url + "user/login", {
        method: "POST",
        body: JSON.stringify(userToLogin),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const code = request.status;

      const response = await request.json();
      const { data, token, message } = response;

      if (code == 200) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(data));
        setLogin({ code, message });
        setAuth(data);
        navigate("/inventory/devices");
      } else {
        setLogin({ code, message });
      }
    } catch (error) {
      console.error("Error al procesar la solicitud:", error);
      setLogin({
        code: 500,
        message:
          "Error al intentar iniciar sesión. Por favor, intenta nuevamente.",
      });
    }
  };

  return (
    <div className="container d-flex mt-5 justify-content-center">
      <div className="card glass">
        <div className="card-body">
          <div className="d-flex justify-content-center m-3">
            <PsychologyIcon sx={{ width: 50, height: 50 }} />
          </div>
          <h5 className="card-title text-center">Login</h5>
          {login.code === 200 && (
            <Alert severity="success">{login.message}</Alert>
          )}
          {login.code && login.code !== 200 && (
            <Alert severity="error">{login.message}</Alert>
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
