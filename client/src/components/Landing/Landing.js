import React from "react";

import style from "./Landing.module.css";

export default function Landing() {
  return (
    <div data-testid="todo" className={style.todo}>
      <div className={style.land}>
        <div className={style.la}>
          <h3> Be your own Chef </h3>

          <p className={style.join}>
            <a data-testid="fakebutton" className="dd" href="/home">
              Join Now!
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
