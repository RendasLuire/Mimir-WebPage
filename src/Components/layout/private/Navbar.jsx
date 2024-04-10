import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="glass">
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">MIMIR</span>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/inventory/computers" className={"nav-link"}>
                  Inventory
                </NavLink>
              </li>
              <li>
                <NavLink to={"/inventory/users"} className={"nav-link"}>
                  Users
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
