import PsychologyIcon from "@mui/icons-material/Psychology";
import "./NavBar.css";

const NavBar = () => {
  return (
    <div className="navbar">
      <nav className="navbar-expand-lg">
        <div className="container-fluid">
          <PsychologyIcon />
          <span className="navbar-brand mb-0 h1">MIMIR</span>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
