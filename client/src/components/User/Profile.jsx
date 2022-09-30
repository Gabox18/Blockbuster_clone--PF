import { useAuth0 } from "@auth0/auth0-react";
import React, { useState } from "react";
import LoginButton from "./Login";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { asynSetUser } from "../../redux/slice.js";
import Navbar from "../Nav Bar/Navbar.jsx";
import Footer from "../Footer/Footer.jsx";
import pencil from "../../assets/pencil.png";
import submit from "../../assets/iconSubmit.png"
import "./Profile.css";

const Profile = () => {
  const { user,isAuthenticated } = useAuth0();
  let userBD = useSelector((state) => state.alldata.user);
  const dispatch = useDispatch();
  console.log(user,'------->')
  let date = new Date();
  let currentDate = date.toISOString().split('T')[0]

  const validate = (data) => {
    let error = {};
    if (!data.date) error.date = "Complete the field date";
    return error;
  };

  const [input, setInput] = useState({
    name: user?.given_name,
    lastname: user?.family_name,
    nickname: user?.nickname,
    picture : user?.picture,
    email : user?.email,
    date: "",
    status: true,
    category: "user",
  });

  const handleOnChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnsubmit = (e) => {
    e.preventDefault(e);
    let error = validate(input)
       if(Object.keys(error).length !== 0){
        alert("Complete the required field");
       }else{
        dispatch(asynSetUser(input));
        alert("added profile info");
       }
    
  };


  return (
    <div>
      {isAuthenticated || userBD.status ? (
        <section className="profileBg-dark">
          <Navbar />
          <div className="container-profile-details">
            <div className="cardPerf">
              <div className="imgPerf">
                <img className="picPerfil" src={userBD?.picture || user.picture} alt="fotito"></img>
              </div>
              <div className="contentPef">
                {<h3>{userBD?.nickname || user.nickname}</h3>}
                <ul className="notDecaration">
                  <li>Name : {userBD?.name || user?.name}</li>
                  <li>Lastname : {userBD?.lastname}</li>
                  <li>Email : {userBD?.email || user?.email}</li>
                  <li>Date :{` ${userBD?.date}` || user.date}</li>
                  {
                    !userBD.category ?
                      (<div>
                        <li>complete your Date</li>
                        <input
                          type="date"
                          name="date"
                          className="input-complete"
                          placeholder="Date of Birth"
                          onChange={handleOnChange}
                          max={currentDate}
                        />
                        <button className="botonD" onClick={handleOnsubmit}>
                          <img className="imgPencil" src={submit} alt="pencil" />
                        </button>
                      </div>)
                      : (<div>
                        <li>Category :{` ${userBD?.category}`}</li>
                        <Link to={"/infoprofile"}>
                          <button className="botonD" >
                            <img className="imgPencil" src={pencil} alt="pencil" />
                          </button>
                        </Link>
                      </div>)
                  }
                </ul>
              </div>
            </div>
            <Link to={"/home"}>
              <div className="btn btn-outline-warning btn-block mb-10 rounded shadow-lg">Home</div>
            </Link>
          </div>
          <Footer />
        </section>
      ) : (
        <LoginButton />
      )}
    </div>
  );
};

export default Profile;
