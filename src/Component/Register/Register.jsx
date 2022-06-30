import axios from "axios";
import Joi from "joi";
import React, { useState } from "react";
import { useNavigate,Navigate } from "react-router-dom";

export default function Register({userData}) {
  const Navgiate = useNavigate();
  const [Loading, setLoading] = useState(false);
  const [User, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    age: "",
  });
  const [ErrorP, setErrorP] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    age: "",
  });
  const schema = Joi.object({
    first_name: Joi.string().min(3).max(10).alphanum().required(),
    last_name: Joi.string().min(3).max(10).alphanum().required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    password: Joi.string().required(),
    age: Joi.number().min(8).max(80).required(),
  });
  function getUser(e) {
    let myUser = { ...User };
    myUser[e.target.name] = e.target.value;
    setUser(myUser);
  }
  function goTo() {
    Navgiate("/Login");
  }
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    let userDetail = ["first_name", "last_name", "email", "password", "age"];
    let errorDetail = [];

    let myErrorP = { ...ErrorP };
    let { error } = schema.validate(User, { abortEarly: false });
    if (error) {
      error.details.map((detail) => {
        let x = detail.message.substring(1, detail.message.indexOf('"', 1));
        errorDetail.push(x);
        myErrorP[x] = detail.message;
      });
      if (userDetail) {
        userDetail.forEach((element) => {
          if (!errorDetail.includes(element)) {
            console.log(element);
            myErrorP[element] = "";
          }
        });
      }
      console.log(myErrorP);
      setErrorP({ ...myErrorP });
      setLoading(false);
    } else {
      let { data } = await axios.post(
        "https://route-egypt-api.herokuapp.com/signup",
        User
      );
      setLoading(false);
      if (data.message == "success") {
        setLoading(false);
        console.log(data.message);
        goTo();
      } else {
        setLoading(false);
        if (
          (data.message =
            "citizen validation failed: email: email already registered")
        ) {
          let x = { ...setErrorP };
          x.email = "email already registered";
          setErrorP({ ...x });
        }
      }
    }
  }
  return (
    <>
    {userData ? <Navigate to='/Home'/> :<div className="h-75 col-10 position-absolute top-50 start-50 translate-middle">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-5 col-sm-10">
            <label htmlFor="first_name" className="p-1">
              First Name
            </label>
            <input
              className="form-control"
              onChange={getUser}
              id="first_name"
              name="first_name"
            ></input>
            <p className="p-1 text-danger">&nbsp;{ErrorP.first_name}</p>
          </div>
          <div className="col-md-5 col-sm-10">
            <label htmlFor="last_name" className="p-1">
              Last Name
            </label>
            <input
              className="form-control"
              id="last_name"
              onChange={getUser}
              name="last_name"
            ></input>
            <p className="p-1 text-danger">&nbsp;{ErrorP.last_name}</p>
          </div>
          <div className="col-md-2 col-sm-10">
            <label htmlFor="age" className="p-1">
              Age
            </label>
            <input
              className="form-control"
              type="number"
              id="age"
              onChange={getUser}
              name="age"
            ></input>
            <p className="p-1 text-danger">&nbsp;{ErrorP.age}</p>
          </div>

          <div className="col-md-6 col-sm-10">
            <label htmlFor="email" className="p-1">
              Email
            </label>
            <input
              className="form-control"
              type="email"
              id="email"
              onChange={getUser}
              name="email"
            ></input>
            <p className="p-1 text-danger">&nbsp;{ErrorP.email}</p>
          </div>
          <div className="col-md-6 col-sm-10">
            <label htmlFor="password" className="p-1">
              Password
            </label>
            <input
              className="form-control"
              type="password"
              id="password"
              onChange={getUser}
              name="password"
            ></input>
            <p className="p-1 text-danger">&nbsp;{ErrorP.password}</p>
          </div>
        </div>
        <div className=" d-flex col justify-content-end">
          <div>
            <button className="btn btn-primary" type="submit">
              {Loading ? (
                <i className="fa fa-spi fa-spinner fa-spin"></i>
              ) : (
                "Register"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>}
    
    </>
  );
}
