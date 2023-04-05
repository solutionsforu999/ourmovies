import React from "react";
import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/" end>
          Call API Project
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/" end>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="posts">
                Popular
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="toprated">
                TopRated
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="upcoming">
                Comingup
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
