import React from "react";
import { NavLink } from "react-router-dom";
import "./Nav.css";

export default function Nav() {
  return (
    <div>
      <nav>
        <ul className="list">
          <li className="list-item">
            <NavLink className="name" exact to="/home">
              Home
            </NavLink>
          </li>

          <li className="list-item">
            <NavLink to="/create">Create Recepies</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
