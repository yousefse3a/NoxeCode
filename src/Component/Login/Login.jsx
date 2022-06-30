import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate,Navigate } from "react-router-dom";
import style from "../Register/Register.module.scss";
export default function Login({ getUserData, userData}) {
  const Navgiate = useNavigate();
  const [Mess, setMess] = useState({ email: "", pass: "" });
  const [Loading, setLoading] = useState(false);
  const [User, setUser] = useState({
    email: "",
    password: "",
  });
  function getUser(e) {
    let myUser = { ...User };
    myUser[e.target.name] = e.target.value;
    setUser(myUser);
  }
  function goTo() {
    Navgiate("/Home");
  }
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    let { data } = await axios.post(
      "https://route-egypt-api.herokuapp.com/signin",
      User
    );
    console.log(data);
    if (data.message == "success") {
      setLoading(false);
      localStorage.setItem("token", data.token);
      getUserData();
      goTo();
    } else {
      setLoading(false);
      console.log(data.message);
      let x = { email: "", pass: "" };
      if (data.message == "email doesn't exist") {
        x.email = data.message;
        setMess(x);
      } else if (data.message == "incorrect password") {
        x.pass = data.message;
        setMess(x);
      }
    }
  }
  return (
    <>
      {userData ?<Navigate to='/Home'/>:<div className="position-absolute top-50 start-50 translate-middle col-10">
        <h2>login</h2>
        <form onSubmit={handleSubmit}>
          <div className="row ">
            <div>
              <label htmlFor="email" className="p1">
                Email :{" "}
              </label>
              <input
                className="form-control"
                type="email"
                id="email"
                onChange={getUser}
                name="email"
              ></input>
              <p className="p-1 text-danger">{Mess.email}&nbsp;</p>
            </div>
            <div>
              <label htmlFor="password" className="p-1">
                Password :{" "}
              </label>
              <input
                className="form-control"
                type="password"
                id="password"
                onChange={getUser}
                name="password"
              ></input>
              <p className="p-1 text-danger">{Mess.pass}&nbsp;</p>
            </div>
            <div className="col d-flex justify-content-between align-items-baseline">
              <Link to={"/Register"} className={style.aa}>
                don't have account ? register
              </Link>
              <button className="btn btn-primary" type="submit">
                {Loading ? (
                  <i className="fa fa-spi fa-spinner fa-spin"></i>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </div>
        </form>
      </div> }
    </>
  );
}
