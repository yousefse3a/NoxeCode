import React from "react";
import { Link } from "react-router-dom";
import style from "../About/About.module.scss";
export default function About() {
  return (
    <>
      <div className={ `${style.About} position-absolute top-50 start-50 translate-middle col-10`}>
        <h2>Let's talk about Noxe</h2>
        <p>
          noxe is a website to show Details about movies and tv shows. you must{" "}
          <Link  to="/Register">register</Link> or <Link to="/Login">login</Link>{" "}
          to can use Noex.
        </p>
        <p>made with reactJs &hearts;</p>
      </div>
    </>
  );
}
