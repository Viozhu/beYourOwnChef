import React from "react";
import { NavLink } from "react-router-dom";
import style from "./Landing.module.css";

export default function Landing() {
  return (
    <div data-testid="todo" className={style.todo}>
      <div className={style.land}>
        <div className={style.la}>
          <h3> Be your own Chef </h3>

          <p className={style.join}>
            <NavLink data-testid="fakebutton" className="dd" to="/home">
              Join Now!
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}
