import { NavLink } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

const Navbar = () => {
  const { auth } = useAuth();
  return (
    <div className="glass">
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">MIMIR</span>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li>
                <NavLink to={"/inventory/dashboard"} className={"nav-link"}>
                  Tablero
                </NavLink>
              </li>
              <li>
                <NavLink to="/inventory/devices" className={"nav-link"}>
                  Inventario
                </NavLink>
              </li>
              <li>
                <NavLink to={"/inventory/users"} className={"nav-link"}>
                  Usuarios
                </NavLink>
              </li>
              <li>
                <NavLink to={"/inventory/annexeds"} className={"nav-link"}>
                  Anexos
                </NavLink>
              </li>
              <li>
                <NavLink to={"/inventory/warehouses"} className={"nav-link"}>
                  Almacenes
                </NavLink>
              </li>
            </ul>
            <div className="d-flex dropdown mx-3">
              <AccountCircleOutlinedIcon />
              <label
                className="nav-link dropdown-toggle mx-1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {auth.name}
              </label>
              <ul className="dropdown-menu glass m-1 p-1">
                <li className="dropdown-item">
                  <SettingsOutlinedIcon />
                  <label>Configuracion</label>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li className="dropdown-item">
                  <LogoutOutlinedIcon />
                  <NavLink to={"/inventory/logout"} className="btn">
                    Cerrar Sesion
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
