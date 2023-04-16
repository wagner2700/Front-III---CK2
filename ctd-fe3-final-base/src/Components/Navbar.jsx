import styles from "./Navbar.module.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth-context";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const { removeUserStorage } = useContext(AuthContext);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("@DataToken");

    if (!token) {
      navigate("/login");
    }
  }, []);

  function logout() {
    removeUserStorage();
    navigate("/login");
  }

  function toggleDarkMode() {
    setIsDarkMode(!isDarkMode);
    const body = document.querySelector('body');
    const html = document.querySelector('html');
    if (body) {
      body.classList.toggle('dark');
    }
    if (html) {
      html.classList.toggle('dark');
    }
  }

  return (
    <header className="sticky-top">
      <nav
        className={`navbar navbar-expand-sm ${
          isDarkMode ? "navbar-dark bg-dark" : "navbar-light bg-light"
        }`}
        aria-label="Third navbar example"
      >
        <div className="container">
          <a
            className={`navbar-brand ${styles.navbarBrand}`}
            href="/home"
          >
            DH Odonto
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarsExample03"
            aria-controls="navbarsExample03"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarsExample03"
          >
            <ul className="navbar-nav mb-2 mb-sm-0">
              <li className={`nav-item ${styles.navBarLink}`}>
                <a className="nav-link" href="/home">
                  Home
                </a>
              </li>
              <li className={`nav-item ${styles.navBarLink}`}>
                <a
                  className={`nav-link ${
                    isDarkMode ? "btn-dark" : "btn-light"}`}
                  href="/login"
                  onClick={logout}
                >
                  Logout
                  </a>
              </li>
              <li className={`nav-item`}>
              <button
                className={`btn ${
                  isDarkMode ? "btn-light" : "btn-dark"
                } ${styles.btnStyle}`}
                onClick={toggleDarkMode}
              >
                {isDarkMode ? "☀️" : "🌙"}
              </button>

              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
