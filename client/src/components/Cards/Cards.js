import React from "react";
import style from "./Cards.module.css";
import { NavLink } from "react-router-dom";

export default function Cards(props) {
  // console.log(props, "hehe");

  return (
    <div className={style.mo}>
      <div className={style.cards}>
        <img className={style.image} src={props.image} alt="ii" />
        <div className={style.dentro}>
          <NavLink to={`/details/${props.id}`}>
            <h5>{props.title}</h5>
          </NavLink>
          <p>
            <b>Diets: </b>
            {props.diets.join(" ~ ")}
          </p>
          <p className={style.info}>More info Click in title</p>
        </div>
      </div>
    </div>
  );
}
