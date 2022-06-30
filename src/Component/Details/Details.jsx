import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import style from "../Details/Details.module.scss";
export default function Details() {
  const [SerachParam, setSerachParam] = useSearchParams();
  const [Details, setDetails] = useState([]);
  const [DetailsGeners, setDetailsGeners] = useState([]);
  const baseUrl = "https://image.tmdb.org/t/p/original";
  let id = SerachParam.get("id");
  let type = SerachParam.get("type");
  async function getDetails(type, id) {
    let { data } =
      await axios.get(`https://api.themoviedb.org/3/${type}/${id}?api_key=0c93c5e4a432cdcd2a801bc548fef4de&language=en-US
        `);
    setDetails(data);
    if (type != "person") {
      setDetailsGeners(data.genres);
    }
  }
  useEffect(() => {
    getDetails(type, id);
  }, []);
  function x() {
    switch (type) {
      case "tv":
        return (
          <>
            <div className="col-12 p-4 row gap-2">
              <div className="col-md-4 col-sm-10">
                <img src={baseUrl + Details.poster_path} className="w-100" />
              </div>
              <div className="col-md-7 col-sm-10 ">
                <h1 className="mb-2">{Details.original_name}</h1>
                <h4 className={style.pp}>{Details.tagline}</h4>
                <div className="col my-3">
                  {DetailsGeners.map((gen, index) => {
                    return (
                      <div className="btn btn-primary btn-sm m-2" key={index}>
                        {gen.name}
                      </div>
                    );
                  })}
                </div>
                <p className="py-1">Vote : {Details.vote_average}</p>
                <p className="py-1">Vote Count : {Details.vote_count}</p>
                <p className="py-1">Popularity : {Details.popularity}</p>
                <p className="py-1">Release Date : {Details.first_air_date}</p>
                <p className={style.pp + " py-1"}>{Details.overview}</p>
              </div>
            </div>
          </>
        );
        break;
      case "person":
        return (
          <>
            <div className="col-12 p-4 row gap-2">
              <div className="col-md-4 col-sm-10">
                <img src={baseUrl + Details.profile_path} className="w-100" />
              </div>
              <div className="col-md-7 col-sm-10">
                <h1 className="mb-2">{Details.name}</h1>
                <p className={style.pp + " py-1"}>{Details.biography}</p>
              </div>
            </div>
          </>
        );
        break;
      case "movie":
        return (
          <>
            <div className="col-12 p-4 row gap-2">
              <div className="col-md-4 col-sm-10">
                <img src={baseUrl + Details.poster_path} className="w-100" />
              </div>
              <div className="col-md-7 col-sm-10">
                <h1 className="mb-2">{Details.title}</h1>
                <h4 className={style.pp}>{Details.tagline}</h4>
                <div className="col my-3">
                  {DetailsGeners.map((gen, index) => {
                    return (
                      <div className="btn btn-primary btn-sm m-2" key={index}>
                        {gen.name}
                      </div>
                    );
                  })}
                </div>
                <p className="py-1">Vote : {Details.vote_average}</p>
                <p className="py-1">Vote Count : {Details.vote_count}</p>
                <p className="py-1">Popularity : {Details.popularity}</p>
                <p className="py-1">Release Date : {Details.release_date}</p>
                <p className={style.pp + " py-1"}>{Details.overview}</p>
              </div>
            </div>
          </>
        );
        break;
    }
  }

  return (
    <>
      <div className="row justify-content-center">{x()}</div>
    </>
  );
}
