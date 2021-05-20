import React, { useState, useEffect } from "react";

import axios from "axios";
import { connect } from "react-redux";
import style from "./Home.module.css";
import { getRecipeQuery } from "../../redux/actions/index";
import Nav from "../Nav/Nav";
import Cards from "../Cards/Cards";
import Post from "./Post";
import Pagination from "./Pagination";

export function Home(props) {
  // console.log("hola");
  // console.log(props, "ho");

  const [recipe, setRecipe] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentpage, setCurrentpage] = useState(1);
  const [postperpage, setPostperpage] = useState(12);

  // Data
  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      const res = await axios.get("http://localhost:3001/recipe/");
      console.log(res, "hoyo");
      setRecipe(res.data);
      setLoading(false);
    };
    fetchPost();
  }, []);

  // Current page
  const lastpost = currentpage * postperpage;
  const firstpost = lastpost - postperpage;
  const currentpost = recipe.slice(firstpost, lastpost);

  //Change page

  const paginate = (pagenumber) => setCurrentpage(pagenumber);

  // Funciones para la search

  function handleChange(e) {
    setSearch(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.getRecipeQuery(search);
    //console.log(props.getRecipeQuery(search), "gege");
  }
  //  console.log(recipe, "recipeeee");

  function reset() {
    setSearch();

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }

  // Order recipe

  function orderasc() {
    recipe.sort((a, b) => {
      const aa = a.title.toLowerCase();
      const bb = b.title.toLowerCase();
      setFil("");
      if (aa < bb) {
        return -1;
      }
      if (aa > bb) {
        return 1;
      }
      return 0;
    });
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }

  function orderdesc() {
    recipe.sort((a, b) => {
      const aa = a.title.toLowerCase();
      const bb = b.title.toLowerCase();
      setFil("");
      if (aa > bb) {
        return -1;
      }
      if (aa < bb) {
        return 1;
      }
      return 0;
    });
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }

  function orderhi() {
    recipe.sort((a, b) => {
      const aa = a.healthScore;
      const bb = b.healthScore;
      setFil("");
      if (aa > bb) {
        return -1;
      }
      if (aa < bb) {
        return 1;
      }
      return 0;
    });
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }

  function orderlow() {
    recipe.sort((a, b) => {
      const aa = a.healthScore;
      const bb = b.healthScore;
      setFil("");
      if (aa < bb) {
        return -1;
      }
      if (aa > bb) {
        return 1;
      }
      return 0;
    });
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }

  /// Filter
  const [fil, setFil] = useState("");

  //  console.log(fil, "fil");
  function filter() {
    let filter = document.getElementById("filterr");
    let diedie = filter.value;

    if (diedie === "Whole30") {
      let who = recipe.filter((e) => {
        return e.diets.includes("whole 30");
      });
      return setFil(who);
    }
    if (diedie === "Primal") {
      let who = recipe.filter((e) => {
        return e.diets.includes("primal");
      });
      console.log("soy re Primal papa");
      return setFil(who);
    }
    if (diedie === "Paleo") {
      let who = recipe.filter((e) => {
        return e.diets.includes("paleolithic");
      });
      console.log("soy re Paleo papa");
      return setFil(who);
    }
    if (diedie === "Pescetarian") {
      let who = recipe.filter((e) => {
        return e.diets.includes("pescatarian");
      });
      console.log("soy re Pescetarian papa");
      return setFil(who);
    }
    if (diedie === "Vegan") {
      let who = recipe.filter((e) => {
        return e.diets.includes("vegan");
      });
      console.log("soy re Vegan papa");
      return setFil(who);
    }
    if (diedie === "Vegetarian") {
      let who = recipe.filter((e) => {
        return e.diets.includes("vegetarian");
      });
      console.log("soy re Vegetarian papa");
      return setFil(who);
    }
    if (diedie === "Ovo-Vegetarian") {
      let who = recipe.filter((e) => {
        return e.diets.includes("fodmap friendly");
      });
      console.log("soy re Ovo-Vegetarian papa");
      return setFil(who);
    }
    if (diedie === "Lacto-Vegetarian") {
      let who = recipe.filter((e) => {
        return e.diets.includes("lacto ovo vegetarian");
      });
      console.log(who, "soy re Lacto-Vegetarian papa");
      return setFil(who);
    }
    if (diedie === "Ketogenic") {
      let who = recipe.filter((e) => {
        return e.diets.includes("ketogenic");
      });
      console.log("soy re Ketogenic papa");
      return setFil(who);
    }
    if (diedie === "Gluten") {
      let who = recipe.filter((e) => {
        return e.diets.includes("gluten free");
      });
      console.log("soy re Gluten papa");
      return setFil(who);
    }
    if (diedie === "Free") {
      let who = recipe.filter((e) => {
        return e.diets.includes("dairy free");
      });
      console.log("soy re Free papa");
      return setFil(who);
    }
  }
  function fis() {
    if (fil.length === 0) {
      console.log("No data");
    } else {
      return fil.map((x) => (
        <Cards title={x.title} diets={x.diets} image={x.image} id={x.id} />
      ));
    }
  }

  ///////
  return (
    <div value="fondo" className={style.fondo}>
      <Nav />
      <div value="h" className={style.h}>
        <div value="side" className={style.side}>
          <div>
            <form value="form" onSubmit={handleSubmit}>
              <div value="search" className={style.search}>
                <label>
                  <h3>Search your Recipe</h3>
                </label>
                <input
                  value="searchbar"
                  type="text"
                  id="title"
                  onChange={handleChange}
                  placeholder="Search a Recipe..."
                  value={search}
                />
                <button type="submit">Search</button>
                <button onClick={reset}>Reset List</button>
              </div>
            </form>
          </div>
          <div value="order" className={style.order}>
            <label>
              <h3>Order</h3>
            </label>
            <button onClick={orderasc}>Ascendent</button>
            <button onClick={orderdesc}>Desendent</button>
            <br />
            <button onClick={orderhi}>Hight Score</button>
            <button onClick={orderlow}>Low Score</button>
          </div>
          <div value="end" className={style.end}>
            <label>
              <h3>Diet Types</h3>
            </label>

            <select
              value="filtro"
              className={style.select}
              id="filterr"
              onChange={filter}
            >
              <option value="nada">Choose here</option>
              <option value="Whole30">Whole30</option>
              <option value="Primal">Primal</option>
              <option value="Paleo">Paleo</option>
              <option value="Pescetarian">Pescetarian</option>
              <option value="Vegan">Vegan</option>
              <option value="Ovo-Vegetarian">Ovo-Vegetarian</option>
              <option value="Lacto-Vegetarian">Lacto-Vegetarian</option>
              <option value="Vegetarian">Vegetarian</option>
              <option value="Ketogenic">Ketogenic</option>
              <option value="Gluten">Gluten</option>
              <option value="Free">Free</option>
            </select>
          </div>
        </div>

        <div value="app" className={style.App}>
          <div>{fis()}</div>

          <div value="mapeado">
            {props.recipe.map((el) => (
              <Cards
                title={el.title}
                diets={el.diets}
                image={el.image}
                id={el.id}
              />
            ))}
          </div>

          <Post post={currentpost} loading={loading} />
        </div>
      </div>
      <div value="pages" className={style.pages}>
        <Pagination
          postperpage={postperpage}
          totalpost={recipe.length}
          paginate={paginate}
        />
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    recipe: state.recipe,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getRecipeQuery: (name) => dispatch(getRecipeQuery(name)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
