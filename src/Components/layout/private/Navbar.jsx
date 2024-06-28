import { NavLink } from "react-router-dom";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PsychologyIcon from "@mui/icons-material/Psychology";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import DevicesIcon from "@mui/icons-material/Devices";
import GroupIcon from "@mui/icons-material/Group";
import FilePresentIcon from "@mui/icons-material/FilePresent";
import MonitorOutlinedIcon from "@mui/icons-material/MonitorOutlined";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

const Navbar = () => {
  return (
    <div className="d-flex h-100">
      <nav className="navbar glass flex-column vh-100">
        <div className="d-flex flex-column align-items-center mb-3">
          <PsychologyIcon />
          <span className="navbar-brand mb-0 h1 ms-2">MIMIR</span>
        </div>
        <ul className="navbar-nav flex-column mb-auto">
          <li className="nav-item">
            <NavLink to="/inventory/dashboard" className="nav-link">
              <SpaceDashboardIcon sx={{ width: 40, height: 40 }} />
            </NavLink>
          </li>
          {/*<li className="nav-item">
            <NavLink to="/inventory/dashboard" className="nav-link">
              <TaskAltIcon sx={{ width: 40, height: 40 }} />
            </NavLink>
          </li>*/}
          <li className="nav-item">
            <NavLink to="/inventory/devices" className="nav-link">
              <DevicesIcon sx={{ width: 40, height: 40 }} />
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/inventory/monitors" className="nav-link">
              <MonitorOutlinedIcon sx={{ width: 40, height: 40 }} />
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/inventory/users" className="nav-link">
              <GroupIcon sx={{ width: 40, height: 40 }} />
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/inventory/annexeds" className="nav-link">
              <FilePresentIcon sx={{ width: 40, height: 40 }} />
            </NavLink>
          </li>
          {/*<li className="nav-item">
            <NavLink to="/inventory/warehouses" className="nav-link">
              <WarehouseIcon sx={{ width: 40, height: 40 }} />
            </NavLink>
          </li>*/}
        </ul>
        <div className="dropup mt-auto">
          <div className="d-flex align-items-center">
            <button
              className="btn btn-secondary dropdown-toggle ms-2"
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
                <SettingsOutlinedIcon />
                <span className="ms-2">Configuración</span>
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
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
