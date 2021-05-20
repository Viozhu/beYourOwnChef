import React, { useState } from "react";
import style from "./Create.module.css";
import { connect } from "react-redux";
import Nav from "../Nav/Nav";
import axios from "axios";

export function Create() {
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    title: "",
    summary: "",
    spoonacularScore: "",
    healthScore: "",
    analyzedInstructions: "",
    diets: [],
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
  });

  function handleChange(e) {
    let arr = [];
    let qwe = document.getElementsByClassName("in");
    //console.log(qwe, "hh");
    for (let i = 0; i < qwe.length; i++) {
      if (qwe[i].checked === true) {
        arr.push(qwe[i].value);
      }
    }

    setInput({
      ...input,
      diets: arr,
      [e.target.name]: e.target.value,
    });

    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(errors, "erros");
    let qqq = Object.values(errors);
    console.log(qqq, "asdasdas");
    if (qqq.length === 0) {
      console.log("axioss");
      axios
        .post("http://localhost:3001/recipe", input)
        .then((res) => alert("Receta Creada"));
    } else {
      return alert("You must need Complete the form!");
    }
    //   if (errors.name) {
    //     return alert("You must need Complete the form!");
    //   } else if (errors.summary) {
    //     return alert("You must need Complete the form!");
    //   } else if (errors.diets) {
    //     return alert("You must need Complete the form!");
    //   } else if (errors.spoonacularScore) {
    //     return alert("You must need Complete the form!");
    //   } else if (errors.healthScore) {
    //     return alert("You must need Complete the form!");
    //   } else {
    //     axios
    //       .post("http://localhost:3001/recipe", input)
    //       .then((res) => alert("Receta Creada"));
    //   }
  }

  function validate(input) {
    let errors = {};
    console.log(input.spoonacularScore, "asa");

    if (!input.title) {
      errors.name = "Title is required";
    }
    if (!input.summary) {
      errors.summary = "Summary is required";
    }
    if (input.diets.length === 0) {
      errors.diets = "Diets is required";
    }
    if (isNaN(input.spoonacularScore) || !input.spoonacularScore) {
      errors.spoonacularScore = "Must be a Number!";
    }
    if (isNaN(input.healthScore) || !input.healthScore) {
      errors.healthScore = "Must be a Number!";
    }

    return errors;
  }

  return (
    <div className={style.todo}>
      <Nav />
      <div className={style.h}>
        <div className={style.conta}>
          <div className={style.info}>
            <form onSubmit={handleSubmit}>
              <h1>👨‍🍳 Create a new recipe ! 👩‍🍳 </h1>
              <div className={style.inp}>
                <label>
                  <b>• Title </b>
                </label>
                <hr />
                <input
                  className={`${errors.name && style.danger}`}
                  placeholder="Title..."
                  type="text"
                  name="title"
                  onChange={handleChange}
                  value={input.title}
                />
                <label>
                  {errors.name && (
                    <p className={style.danger}>{errors.name}!</p>
                  )}
                </label>
              </div>
              <div className={style.inst}>
                <p>
                  <b>• Summary </b>
                </p>
                <hr />
                <input
                  className={`${errors.summary && style.danger}`}
                  placeholder="Summary..."
                  type="text"
                  name="summary"
                  onChange={handleChange}
                  value={input.summary}
                />

                {errors.summary && (
                  <p className={style.danger}>{errors.summary}!</p>
                )}
              </div>

              <div className={style.inp}>
                <label>
                  <b>• Score </b>
                </label>
                <hr />
                <input
                  placeholder="Score..."
                  type="text"
                  name="spoonacularScore"
                  onChange={handleChange}
                  value={input.spoonacularScore}
                />
                {errors.spoonacularScore && (
                  <p className={style.danger}>{errors.spoonacularScore}</p>
                )}
              </div>
              <div className={style.inp}>
                <label>
                  <b>• Health Score </b>
                </label>
                <hr />
                <input
                  placeholder="Health Score..."
                  type="text"
                  name="healthScore"
                  onChange={handleChange}
                  value={input.healthScore}
                />
              </div>
              {errors.healthScore && (
                <p className={style.danger}>{errors.healthScore}</p>
              )}
              <div className={style.inst}>
                <p>
                  <b>• Instructions </b>
                </p>
                <hr />
                <input
                  placeholder="Instructions..."
                  type="text"
                  name="analyzedInstructions"
                  onChange={handleChange}
                  value={input.analyzedInstructions}
                />
              </div>
              <div className={style.inst}>
                <p>
                  <b>• Diets</b>
                  {errors.diets && (
                    <p className={style.danger}>{errors.diets}!</p>
                  )}
                </p>
                <hr />
              </div>
              <div className={style.check}>
                <input
                  type="checkbox"
                  class="in"
                  value="1"
                  onChange={handleChange}
                />
                <p>Whole30</p>
                <input
                  type="checkbox"
                  class="in"
                  value="2"
                  onChange={handleChange}
                />
                <p>Primal</p>
                <input
                  type="checkbox"
                  class="in"
                  value="3"
                  onChange={handleChange}
                />
                <p>Paleo</p>
                <input
                  type="checkbox"
                  class="in"
                  value="4"
                  onChange={handleChange}
                />
                <p>Pescetarian</p>
                <input
                  type="checkbox"
                  class="in"
                  value="5"
                  onChange={handleChange}
                />
                <p>Vegan</p>
                <input
                  type="checkbox"
                  class="in"
                  value="6"
                  onChange={handleChange}
                />
                <p>Ovo-Vegetarian</p>
              </div>
              <div className={style.check}>
                <input
                  type="checkbox"
                  class="in"
                  value="7"
                  onChange={handleChange}
                />
                <p>Lacto-Vegetarian</p>
                <input
                  type="checkbox"
                  class="in"
                  value="8"
                  onChange={handleChange}
                />
                <p>Vegetarian</p>
                <input
                  type="checkbox"
                  class="in"
                  value="9"
                  onChange={handleChange}
                />
                <p>Ketogenic</p>
                <input
                  type="checkbox"
                  class="in"
                  value="10"
                  onChange={handleChange}
                />
                <p>Gluten</p>
                <input
                  type="checkbox"
                  class="in"
                  value="11"
                  onChange={handleChange}
                />{" "}
                <p>Free</p>
              </div>
              <div className={style.button}>
                <button type="submit"> Create Recipe</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default connect(null, null)(Create);
