import { useState } from "react";
import { NavLink } from "react-router-dom";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PsychologyIcon from "@mui/icons-material/Psychology";
import LocalPrintshopOutlinedIcon from "@mui/icons-material/LocalPrintshopOutlined";
import DevicesIcon from "@mui/icons-material/Devices";
import GroupIcon from "@mui/icons-material/Group";
import FilePresentIcon from "@mui/icons-material/FilePresent";
import { Tooltip } from "@mui/material";
import "./Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar navbar-expand-md navbar-light fixed-top">
      <div className="container-fluid">
        <div className="d-flex align-items-center">
          <NavLink className="navbar-brand ms-2 mb-0" to="/">
            <PsychologyIcon />
            MIMIR
          </NavLink>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
          onClick={toggleNavbar}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}
          id="navbarNav"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Tooltip title="Dispositivos" placement="bottom">
                <NavLink to="/inventory/devices" className="nav-link">
                  <DevicesIcon />
                  <span>Dispositivos</span>
                </NavLink>
              </Tooltip>
            </li>
            <li className="nav-item">
              <Tooltip title="Impresoras" placement="bottom">
                <NavLink to="/inventory/printers" className="nav-link">
                  <LocalPrintshopOutlinedIcon />
                  <span>Impresoras</span>
                </NavLink>
              </Tooltip>
            </li>
            <li className="nav-item">
              <Tooltip title="Usuarios" placement="bottom">
                <NavLink to="/inventory/users" className="nav-link">
                  <GroupIcon />
                  <span>Usuarios</span>
                </NavLink>
              </Tooltip>
            </li>
            <li className="nav-item">
              <Tooltip title="Anexos" placement="bottom">
                <NavLink to="/inventory/annexeds" className="nav-link">
                  <FilePresentIcon />
                  <span>Anexos</span>
                </NavLink>
              </Tooltip>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item dropup">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <AccountCircleOutlinedIcon />
              </button>
              <ul
                className="dropdown-menu dropdown-menu-dark"
                aria-labelledby="dropdownMenuButton"
              >
                <li className="dropdown-item">
                  <NavLink to="/inventory/settings" className="nav-link">
                    <SettingsOutlinedIcon />
                    <span className="ms-2">Configuración</span>
                  </NavLink>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li className="dropdown-item">
                  <LogoutOutlinedIcon />
                  <NavLink
                    to="/inventory/logout"
                    className="nav-link d-inline p-0"
                  >
                    Cerrar Sesión
                  </NavLink>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
