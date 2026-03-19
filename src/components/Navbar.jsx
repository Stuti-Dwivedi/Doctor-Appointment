import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [token, setToken] = useState("");
  const location = useLocation();
  const nav = useNavigate();

  useEffect(() => {
    const t = JSON.parse(localStorage.getItem("token"));
    setToken(t);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    nav("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark nav-custom">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          DocBook
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navv"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navv">
          <ul className="navbar-nav ms-auto gap-2">
            {!token ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/book">
                    Book
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/appointments">
                    View
                  </Link>
                </li>
                <li className="nav-item">
                  <button className="btn btn-sm btn-light" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
