import React from "react";
import style from "./Pagination.module.css";
const Pagination = ({ postperpage, totalpost, paginate }) => {
  const pagenumbers = [];

  for (let i = 1; i <= Math.ceil(totalpost / postperpage); i++) {
    pagenumbers.push(i);
  }

  return (
    <nav key="nam" className={style.nav}>
      <ul key="cada" className={style.cada}>
        {pagenumbers.map((e) => (
          <li>
            <a className={style.button} onClick={() => paginate(e)}>
              {e}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
