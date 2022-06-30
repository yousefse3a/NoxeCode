import React, { useContext } from "react";
import style from "../../Home/Home.module.scss";
import { MediaContext } from "../../MediaContext/MediaContext";
export default function AiringToday() {
  const { AiringToday } = useContext(MediaContext);
  const { baseUrl } = useContext(MediaContext);
  const { goToDetails } = useContext(MediaContext);
  return (
    <>
      <div className="d-flex row col-12 justify-content-center">
        <div className="col-lg-4 col-md-6 col-6 position-relative ">
          <div
            className={`${style.headTreanding} position-absolute top-50 start-50 translate-middle col-10`}
          >
            <h2>
              Airing Today
              <br />
              TVshows
              <br />
              to watch now
            </h2>
            <p className={style.pp}>Most watched tv by days</p>
          </div>
        </div>
        {AiringToday.map((tv, index) =>
          index  ? (
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
                    <i className="position-absolute top-50 start-50 translate-middle col-10">
                      {tv.vote_average}
                    </i>
                  </div>
                </div>
                <h6>{tv.original_name}</h6>
              </div>
            </div>
          ) : (
            ""
          )
        )}
      </div>
    </>
  );
}
