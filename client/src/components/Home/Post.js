import React from "react";
import Cards from "../Cards/Cards";
import style from "./Post.module.css";

const Post = ({ post, loading }) => {
  if (loading) {
    return (
      <div className={style.loading}>
        <h1>________</h1>
        <h2>Loading...</h2>
        <h1>________</h1>
      </div>
    );
  }

  return (
    <ul>
      {post.map((post) => (
        <Cards
          title={post.title}
          diets={post.diets}
          image={post.image}
          id={post.id}
        />
      ))}
    </ul>
  );
};
export default Post;
