import { API } from "../../../utils/Urls";
import useForm from "../../../hooks/useForm";
import "./Login.css";
import TextField from "@mui/material/TextField";
import useAuth from "../../../hooks/useAuth";
import { useState, useRef, useEffect } from "react";

const Login = () => {
  const { formState, onInputChange } = useForm({
    nickname: "",
    password: "",
  });
  const [error, setError] = useState("");
  const { setAuth } = useAuth();
  const userInputRef = useRef(null);

  useEffect(() => {
    userInputRef.current?.focus();
  }, []);

  const loginUser = async (e) => {
    try {
      e.preventDefault();

      if (!formState.nickname || !formState.password) {
        setError("Usuario y contraseña son requeridos");
        return;
      }

      const request = await fetch(`${API.users}/login`, {
        method: "POST",
        body: JSON.stringify(formState),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!request.ok) {
        const errorResponse = await request.json();
        setError(errorResponse.message || "Error al procesar la solicitud");
        return;
      }

      const response = await request.json();
      const { data, token, message } = response;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(data));
      setAuth(data);
      setError(message);
    } catch (error) {
      setError("Error al procesar la solicitud");
    }
  };

  return (
    <div className="login-container">
      <div className="card">
        <form onSubmit={loginUser} autoComplete="off">
          <div className="card-header">
            <h5 className="card-title">Login</h5>
          </div>
          <div className="card-body">
            <small className="text-danger">{error}</small>
            <TextField
              type="text"
              className="form-control"
              label="Usuario"
              name="nickname"
              value={formState.nickname}
              onChange={onInputChange}
              ref={userInputRef}
            />
            <TextField
              type="password"
              className="form-control"
              label="Contraseña"
              name="password"
              value={formState.password}
              onChange={onInputChange}
            />
          </div>
          <div className="card-footer">
            <div className="btn-group">
              <button type="button" className="btn btn-primary">
                Registrarse
              </button>
              <button type="submit" className="btn btn-primary">
                Iniciar Sesion
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
