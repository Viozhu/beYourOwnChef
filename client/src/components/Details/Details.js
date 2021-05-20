import React, { useEffect } from "react";

import style from "./Details.module.css";
import { connect } from "react-redux";
import { getRecipeID } from "../../redux/actions/index";
import Nav from "../Nav/Nav";

export function Details(props) {
  // console.log(props, "props");
  // console.log(props.recipeDetail.data, "datasssssss");
  const recipedetail = props.recipeDetail.data;
  // const rere = props.recipeDetail.id;
  // console.log(recipedetail, "details");
  useEffect(() => {
    const recipeId = props.match.params.id;
    //console.log(recipeId, "recipeeeeeeeeeeeeeeeeeeeee");
    props.getRecipeID(recipeId);

    // console.log(props.getRecipeID(recipeId), "meid");
  }, []);

  var aaa = recipedetail?.analyzedInstructions[0]?.steps;

  function steps() {
    if (recipedetail?.id.length > 10) {
      return recipedetail?.analyzedInstructions;
    } else {
      if (!recipedetail?.analyzedInstructions[0]) {
        console.log("nadax");
      } else {
        var qwe = aaa.map((x) => (
          <div>
            <p>
              <b>{x.number} • </b>
              {x.step}
            </p>
          </div>
        ));
        return qwe;
      }
    }
  }

  return (
    <div className={style.page}>
      <Nav />
      <div className={style.todo}>
        <div className={style.detail}>
          <div className={style.info}>
            <h2>{recipedetail?.title}</h2>
            <p className={style.panic}>
              <b>Diets: </b>
              {recipedetail?.diets.join(" ~ ")}
            </p>
            <img className={style.img} src={recipedetail?.image} />
            <div className={style.score}>
              <p>
                <b>Score: </b>
                {recipedetail?.spoonacularScore}
              </p>
              <p>
                <b>HealthScore: </b>
                {recipedetail?.healthScore}
              </p>
            </div>
            <div className={style.sum}>
              <p>
                <b>Summary: </b>
                {recipedetail?.summary}
              </p>
            </div>
          </div>
          <div className={style.steps}>
            <h2>How make it</h2>
            <p>______</p>
            {steps()}
          </div>
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    recipeDetail: state.recipeDetail,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getRecipeID: (id) => dispatch(getRecipeID(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Details);
