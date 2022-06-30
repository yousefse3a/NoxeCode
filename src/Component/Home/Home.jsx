import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MediaContext } from "../MediaContext/MediaContext";
import style from "../Home/Home.module.scss";

export default function Home() {
  const { baseUrl } = useContext(MediaContext);
  const { PersonTrend } = useContext(MediaContext);
  const { MoviesTrend } = useContext(MediaContext);
  const { TvTrend } = useContext(MediaContext);
  const { goToDetails } = useContext(MediaContext);

  return (
    <>
      <div className="d-flex row col-12 justify-content-center">
        <div className=" col-lg-4 col-md-6 col-6 position-relative ">
          <div
            className={`${style.headTreanding} position-absolute top-50 start-50 translate-middle col-10`}
          >
            <h2>
              Trending
              <br />
              Movies
              <br />
              to watch now
            </h2>
            <p className={style.pp}>Most watched movies by days</p>
          </div>
        </div>
        {MoviesTrend.map((movie, index) =>(
          index < 10 ?
         <div
            className="col-lg-2 col-md-4  col-6"
            key={index}
            onClick={() => {
              goToDetails(movie.id, "movie");
            }}
          >
            <div>
              <div className="position-relative my-3">
                <img
                  src={baseUrl + movie.poster_path}
                  className={"col-12 my-1"}
                />
                <div className={style.evaluation}>
                  <i className="position-absolute top-50 start-50 translate-middle col-10">{movie.vote_average}</i>
                </div>
              </div>
              <h6>{movie.title}</h6>
            </div>
          </div>
        :""))}
      </div>
      <div className="d-flex row col-12 justify-content-center">
        <div className="col-lg-4 col-md-6 col-6 position-relative ">
          <div
            className={`${style.headTreanding} position-absolute top-50 start-50 translate-middle col-10`}
          >
            <h2>
              Trending
              <br />
              TVshows
              <br />
              to watch now
            </h2>
            <p className={style.pp}>Most watched tv by days</p>
          </div>
        </div>
        {TvTrend.map((tv, index) => (
          index < 10?
          <div
            className="col-lg-2 col-md-4 col-6"
            key={index}
            onClick={() => {
              goToDetails(tv.id, "tv");
            }}
          >
            <div>
              <div className="position-relative my-3">
                <img
                  src={baseUrl + tv.poster_path}
                  className={"col-12 my-1"}
                />
                <div className={style.evaluation}>
                  <i className="position-absolute top-50 start-50 translate-middle col-10">{tv.vote_average}</i>
                </div>
              </div>
              <h6>{tv.original_name}</h6>
            </div>
          </div>
        :""))}
      </div>
      <div className="d-flex row col-12 justify-content-center">
        <div className="col-lg-4 col-md-6 col-6 position-relative ">
          <div
            className={`${style.headTreanding} position-absolute top-50 start-50 translate-middle col-10`}
          >
            <h2>
              Trending
              <br />
              Person
              <br />
              to Know now
            </h2>
            <p className={style.pp}>Most trending persons by days</p>
          </div>
        </div>
        {PersonTrend.map((person, index) => (
          index<10?
          <div
            className="col-lg-2  col-md-4 col-6"
            key={index}
            onClick={() => {
              goToDetails(person.id, "person");
            }}
          >
            <div>
              <div className="position-relative my-3">
                <img
                  src={baseUrl + person.profile_path}
                  className={"col-12 my-1"}
                />
              
              </div>
              <h6>{person.name}</h6>
            </div>
          </div>
       :"" ))}
      </div>      
    </>
  );
}
