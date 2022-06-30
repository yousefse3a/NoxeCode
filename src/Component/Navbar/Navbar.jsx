import React from "react";
import { Link } from "react-router-dom";
import style from "./Navbar.module.css";

export default function Navbar({ userData, userLogout }) {
  return (
    <>
      <nav className={`navbar navbar-expand-lg navbar-dark  ${style.Navbar}`}>
        <div className="container-fluid">
          <Link className={style.Loge + " navbar-brand"} to="Home">
            Noxe
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse text-center"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {userData ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="home">
                      Home
                    </Link>
                  </li>
               
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                       Movies
                    </a>
                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                      <li>
                        <Link className="dropdown-item" to="Movies/Popular">
                          Popular
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="Movies/Now">
                         Now playing
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="Movies/Upcoming">
                          Upcoming
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="Movies/Toprated">
                          Top Rated
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                       Tv Shows
                    </a>
                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                      <li>
                        <Link className="dropdown-item" to="Tv/AiringToday">
                          Today
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="Tv/OnAir">
                         On Air
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="Tv/Poptv">
                          Popular
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="Tv/Topratedtv">
                          Top Rated
                        </Link>
                      </li>
                    </ul>
                  </li>
               
                  <li className="nav-item">
                    <Link className="nav-link" to="Persons">
                      People
                    </Link>
                  </li>
                </>
              ) : (
                " "
              )}
              <li className="nav-item">
                <Link className="nav-link" to="About">
                  About
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 text-center">
              <li className="nav-item">
                {userData ? (
                  <a className="nav-link">
                    {"hello" + "  " + userData.first_name}
                  </a>
                ) : (
                  ""
                )}
              </li>
              <li
                className="nav-item d-flex justify-content-evenly align-items-center"
                style={{ width: "100px" }}
              >
                <a
                  href="#"
                  className={`fa-brands fa-facebook ${style.social}`}
                ></a>
                <a
                  href="#"
                  className={`fa-brands fa-twitter ${style.social}`}
                ></a>
                <a
                  href="#"
                  className={`fa-brands fa-youtube ${style.social}`}
                ></a>
              </li>
              {!userData ? (
                <>
                  {" "}
                  <li className="nav-item">
                    <Link className="nav-link" to="Register">
                      Register
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="Login">
                      Login
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <a className="nav-link" onClick={userLogout}>
                      Logout
                    </a>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
