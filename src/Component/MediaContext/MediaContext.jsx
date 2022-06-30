import React, { useContext, useState,useEffect,createContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const MediaContext = createContext();
export default function MediaContextProvider(props) {
  const baseUrl='https://image.tmdb.org/t/p/original';
  let [PersonTrend, setPersonTrend] = useState([]);
  let [TvTrend, setTvTrend] = useState([]);
  let [MoviesTrend, setMoviesTrend] = useState([]);
  let [PopMovies, setPopMovies] = useState([]);
  let [UpMovies, setUpMovies] = useState([]);
  let [TopMovies, setTopMovies] = useState([]);
  let [NowMovies, setNowMovies] = useState([]);
  let [AiringToday, setAiringToday] = useState([]);
  let [Topratedtv, setTopratedtv] = useState([]);
  let [OnAir, setOnAir] = useState([]);
  let [Poptv, setPoptv] = useState([]);
  async function getTrendingItems(trend,callback) {
    let { data } = await axios(
      `https://api.themoviedb.org/3/trending/${trend}/day?api_key=0c93c5e4a432cdcd2a801bc548fef4de`
    );
    callback(data.results);
    console.log(data);
  }
  async function getItems(type,typeCase,callback) {
    let { data } = await axios(
      `https://api.themoviedb.org/3/${type}/${typeCase}?api_key=0c93c5e4a432cdcd2a801bc548fef4de&language=en-US&page=1`
    );
    callback(data.results);
    console.log(data);
  }
  useEffect(() => {
    getTrendingItems('movie',setMoviesTrend);
    getTrendingItems('tv',setTvTrend);
    getTrendingItems('person',setPersonTrend);
    getItems('movie','popular',setPopMovies);
    getItems('movie','top_rated',setTopMovies);
    getItems('movie','upcoming',setUpMovies);
    getItems('movie','now_playing',setNowMovies);
    getItems('tv','popular',setPoptv);
    getItems('tv','airing_today',setAiringToday);
    getItems('tv','on_the_air',setOnAir);
    getItems('tv','top_rated',setTopratedtv);
  }, []);
  let navigate=useNavigate();
  function goToDetails(id,type){
    navigate({
      pathname:"/Details",
      search:`?id=${id}&type=${type}`
    });
  }
  return (
    <MediaContext.Provider value={{PersonTrend,TvTrend,MoviesTrend,baseUrl,goToDetails,PopMovies,TopMovies,NowMovies,UpMovies,Poptv,AiringToday,OnAir,Topratedtv}}>
      {props.children}
    </MediaContext.Provider>
  );
  }
