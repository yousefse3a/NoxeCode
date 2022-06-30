import jwtDecode from "jwt-decode";
import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import About from "../About/About";
import Home from "../Home/Home";
import Login from "../Login/Login";
import Navbar from "../Navbar/Navbar";
import Protectedroute from "../Protectedroute/Protectedroute";
import Register from "../Register/Register";
import Tv from "../Tv/Tv";
import Movies from "../Movies/Movies";
import Details from "../Details/Details";
import MediaContextProvider from "../MediaContext/MediaContext";
import Persons from "../Persons/Persons";
import Popular from "../Movies/Popular/Popular";
import Upcoming from "../Movies/Upcoming/Upcoming";
import Toprated from "../Movies/Toprated/Toprated";
import Now from "../Movies/Now/Now";
import AiringToday from "../Tv/AiringToday/AiringToday";
import Topratedtv from "../Tv/Topratedtv/Topratedtv";
import OnAir from "../Tv/OnAir/OnAir";
import Poptv from "../Tv/Poptv/Poptv";

export default function App() {
  const Navigate = useNavigate();
  const [userData, setuserData] = useState(null);
  
  function userLogout() {
    localStorage.removeItem("token");
    setuserData(null);
    Navigate("/Login");
  }
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getUserData();
    }
  }, []);
  // let location = useLocation();
  // let hideNavbar = <Navbar userData={userData} userLogout={userLogout} />;
  // if (location.pathname == "/Logreg") {
  //   hideNavbar = <></>;
  // }

  return (
    <>
      <MediaContextProvider>
        <Navbar userData={userData} userLogout={userLogout} />
        <div
          className="container position-relative "
          style={{ height: "75vh" }}
        >
          <Routes>
            <Route path="About" element={<About />}></Route>
            <Route element={<Protectedroute userData={userData} />}>
              <Route path="/" element={<Home />}></Route>
              <Route path="Home" element={<Home />}></Route>
              <Route path="Tv" element={<Tv />}>
                <Route path="Poptv" element={<Poptv />} />
                <Route path="AiringToday" element={<AiringToday />} />
                <Route path="Topratedtv" element={<Topratedtv />} />
                <Route path="OnAir" element={<OnAir />} />
              </Route>
              <Route path="Persons" element={<Persons />}></Route>
              <Route path="Movies" element={<Movies />}>
                <Route path="Popular" element={<Popular />} />
                <Route path="Upcoming" element={<Upcoming />} />
                <Route path="Toprated" element={<Toprated />} />
                <Route path="Now" element={<Now />} />
              </Route>
              <Route path="Details" element={<Details />}></Route>
            </Route>
            <Route
              path="Register"
              element={<Register userData={userData} />}
            ></Route>
            <Route
              path="Login"
              element={<Login getUserData={getUserData} userData={userData} />}
            ></Route>
          </Routes>
        </div>
      </MediaContextProvider>
    </>
  );
}
