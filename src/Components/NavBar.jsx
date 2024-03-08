import { NavLink } from "react-router-dom"
import BookOutlinedIcon from '@mui/icons-material/BookOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import DevicesOutlinedIcon from '@mui/icons-material/DevicesOutlined';
import MonitorOutlinedIcon from '@mui/icons-material/MonitorOutlined';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <NavLink to={"/"} className="navbar-brand"><BookOutlinedIcon className="d-inline-block align-text-top" fontSize="large"/> MIMIR</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink to={"/"} className="nav-link"><HomeOutlinedIcon className="d-inline-block align-text-top"/> Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={"/users"} className="nav-link"><PeopleAltOutlinedIcon className="d-inline-block align-text-top"/> Users</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={"/computers"} className="nav-link"><DevicesOutlinedIcon className="d-inline-block align-text-top"/> Computers</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={"/monitors"} className="nav-link"><MonitorOutlinedIcon className="d-inline-block align-text-top"/> Monitors</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={"/printers"} className="nav-link"><LocalPrintshopOutlinedIcon className="d-inline-block align-text-top"/> Printers</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={"/annexeds"} className="nav-link"><ArticleOutlinedIcon className="d-inline-block align-text-top"/> Annexeds</NavLink>
            </li>
          </ul>
          <div className="nav-item dropdown px-5">
              <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false"><AccountCircleOutlinedIcon fontSize="large"/></a>
              <ul className="dropdown-menu">
                <li><NavLink to={"/settings"} className="dropdown-item"><SettingsOutlinedIcon /> Settings</NavLink></li>
                <li><hr className="dropdown-divider"/></li>
                <li><NavLink to={"/LogOut"} className="dropdown-item"><LogoutOutlinedIcon /> LogOut</NavLink> </li>
              </ul>
            </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
