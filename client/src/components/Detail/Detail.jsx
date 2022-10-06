import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import "./detail.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  asyncgetDetails,
  clearDetail,
  asyncUpdateMovie,
  asyncallMovies,
  asyncFavoriteMovie,
  asyncFavList,
} from "../../redux/slice.js";
//import ReactPlayer from 'react-player';
import video from "../../assets/video.mp4";
import ComentForm from "../ComentForm.jsx/ComentForm";
import { useAuth0 } from "@auth0/auth0-react";
import Footer from "../Footer/Footer";
import NavBar from "../Nav Bar/Navbar";
import Allcomments from "../ComentForm.jsx/AllComments/Allcomments";
import Carrusel from "../Carrusel/Carrusel";
import { user } from "../../redux/dataMock";

export default function Detail() {
  const { loginWithRedirect } = useAuth0();
  const { id } = useParams();
  const dispatch = useDispatch();
  let { details } = useSelector((store) => store.alldata);
  let userdb = useSelector((store) => store.alldata.user);
  let { copyAllMovies } = useSelector((store) => store.alldata);
  let { favoriteMovie } = useSelector((store) => store.alldata);
  let idMovie = favoriteMovie?.map((e) => e.idMovie);
  let userId = userdb.id;
  // let mapFav = favoriteMovie?.map((e)=> e.idMovie );
  let mapFav = favoriteMovie?.filter((e) => e.idUser == userId);
  console.log(mapFav, "esto es idmovie");
  const filterTrue = copyAllMovies?.filter(
    (e) => e.status === true && e.name !== details.name
  );
  const moviesCarrusel = filterTrue?.filter(
    (e) => mapFav.map((x) => x.idMovie) === e.id
  );
  console.log(moviesCarrusel, "esto es lo que se render");
  const input = {
    idMovie: id,
    idUser: userdb.id,
  };
  useEffect(() => {
    dispatch(asyncgetDetails(parseInt(id)));
    dispatch(asyncallMovies());
    dispatch(asyncFavList());

    return () => {
      dispatch(clearDetail());
    };
  }, [dispatch, id]);

  function handleAddFav() {
    console.log(input, "esto es el inpout fav");
    dispatch(asyncFavoriteMovie(input));
  }

  function handleBannMovie() {
    let obj = { id };
    dispatch(asyncUpdateMovie(obj));
  }

  return (
    <div className="detailRender">
      <div className="videoBg">
        <video src={video} muted loop autoPlay></video>
      </div>
      <NavBar />

      <div className="cardStyle">
        <div className="cardDetail">
          <div className="image">
            <img
              src={details.poster}
              className="card-img-top"
              alt="..."
              autofocus
            />
          </div>
          {/* <div className="player-wrapper">
         <ReactPlayer
          className="react-player"
          url="https://youtu.be/Oy_SER6dfK4"
          controls
        />  
        </div>*/}
          <div className="infodetail">
            <div className="title">
              <p>{details.name}</p>
            </div>
            <div className="plot">
              <div className="titleInfo">
                <label className="backtitle">
                  <b>Descrption:</b> {details.plot}
                </label>
              </div>
              <div className="lessInfo">
                <label className="language">
                  <b>Director: </b>
                  {details.director}{" "}
                </label>
                <label className="language">
                  <b>Year:</b> {details.year}
                </label>
                <label className="language">
                  <b>Genre:</b> {details.genre}
                </label>
                <label className="language">
                  <b>Language:</b> {details.language}
                </label>
                <label className="language">
                  <b>Rating:</b> {details.imdbRating}
                </label>
                <label className="language">
                  <b>Actors:</b> {details.actors}
                </label>
              </div>
            </div>
          </div>
        </div>
        {userdb.category === "admin" ||
        userdb.category === "gold" ||
        userdb.category === "silver" ? (
          <Link to={`/details/${id}/play`}>
            <button
              className="btn btn-primary btn-block mb-10 rounded-pill shadow-lg"
              type="shadow-lg p-3 mb-5 bg-body rounded"
            >
              {" "}
              Play{" "}
            </button>
          </Link>
        ) : (
          <button
            className="btn btn-primary btn-block mb-10 rounded-pill shadow-lg"
            type="shadow-lg p-3 mb-5 bg-body rounded"
            disabled
          >
            {" "}
            Play{" "}
          </button>
        )}

        {idMovie.includes(details.id) ? (
          //   <div>
          //   <input
          //     onClick={handleAddFav}
          //     className="heart"
          //     type="checkbox"
          //     id="favorite"
          //     name="favorite-checkbox"
          //     value="favorite-button"
          //   />
          //   <label for="favorite" className="containerLike">
          //     <svg
          //       xmlns="http://www.w3.org/2000/svg"
          //       width="24"
          //       height="24"
          //       viewBox="0 0 24 24"
          //       fill="none"
          //       stroke="currentColor"
          //       stroke-width="2"
          //       stroke-linecap="round"
          //       stroke-linejoin="round"
          //       className="feather feather-heart"
          //     >
          //       <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          //     </svg>
          //     <div className="action">
          //       <span className="option-2">Added to Favorites</span>
          //       <span className="option-1">Add to Favorites</span>
          //     </div>
          //   </label>
          // </div>
          <div className="butoncitofav">
            <button  onClick={handleAddFav} className="buttonFav">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="red"
                className="bi bi-heart-fill"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                />
              </svg>
            </button>
          </div>
        ) : (
          <div className="butoncitofav1">
            <button  onClick={handleAddFav} className="buttonFav1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="yellow"
                className="bi bi-heart-fill"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                />
              </svg>
            </button>
          </div>
        )}

        {userdb.category === "admin" ? (
          <div>
            <label class="switch">
              <input type="checkbox" onChange={handleBannMovie} />
              {details.status === true ? (
                <span className="slider"></span>
              ) : (
                <span className="slider1"></span>
              )}
            </label>
          </div>
        ) : (
          <></>
        )}
      </div>

      <div className="card-bodyDi col-auto p-5 justify-content-center btn-detail">
        <Link to="/home">
          <button
            className="btn btn-primary btn-block mb-10 rounded-pill shadow-lg"
            type="shadow-lg p-3 mb-5 bg-body rounded"
          >
            {" "}
            Back{" "}
          </button>
        </Link>
        {/* <a href="#" className="card-link">Another link</a> */}
      </div>

      <div>
        {userdb.picture ? (
          <ComentForm idParams={parseInt(id)} />
        ) : (
          <div>
            <a onClick={() => loginWithRedirect()}>
              <p className="alert">Click on my to login </p>
            </a>

            <Link to="/">
              <p className="alert2">
                If you are logged in, complete the information in the profile.
              </p>
            </Link>
          </div>
        )}
      </div>
      <div>
        <Allcomments idParams={parseInt(id)} />
      </div>

      <div className="conteiner-carruzel-home">
        <h2 className="textCarruzel">My favorites movies</h2>
        <Carrusel array={moviesCarrusel} />
      </div>

      <Footer />
    </div>
  );
}
