import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Landing.css";
import Carrusel from "../Carrusel/Carrusel";
import { useDispatch, useSelector } from "react-redux";
import { asyncallMovies,asyncGetUser,asynPaymentSilver,asynPaymentGold } from "../../redux/slice";
import { useAuth0 } from "@auth0/auth0-react";
import Footer from "../Footer/Footer";
import video from "../../assets/video.mp4"
import Nav from "../Nav Bar/Navbar"
import flecha from "../../assets/flecha.png"



export default function Landing() {
  const { user,loginWithRedirect } = useAuth0();
  let userDB = useSelector(state=>state.alldata.user)
  console.log(user,'user')
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncallMovies());
    dispatch(asyncGetUser(user?.email))
  }, [dispatch, user]);

let { copyAllMovies } = useSelector((state) => state.alldata);
const moviesCarrusel = copyAllMovies.filter(e => e.name !=='Spider-Man')
console.log(copyAllMovies)
console.log(moviesCarrusel)

function handleSubmitSilver() {
  userDB?.id?
  dispatch(asynPaymentSilver())
  :loginWithRedirect()
  
}
function handleSubmitGold() {
  userDB?.id?
  dispatch(asynPaymentGold())
  :loginWithRedirect()
}

  return (
    <>
      <div className="ContainerLanding">
        <div>
       <Nav/>     
        </div>
        <div className="vieitoF">
      <video src={video} muted loop autoPlay className="videitoFondo" />
         <div className="textol"> <div className="loader">
    <span>BlockBuster</span>
    <span>BlockBuster</span>
</div> 

</div>
     <div className="texto2"><b>Fasten your seat belts, this is going to be a busy night!!</b>
    <div className="scrollArrow">scroll down</div>
     <div><img className="flechita" src={flecha} alt="flechicta"/></div></div>
        </div>
        <div className="container-plan">
          <div>
            <div className="container-logo">
              <img
                src="https://logodownload.org/wp-content/uploads/2021/03/paramount-plus-logo-0.png"
                width="120px"
                alt="img"
                className="LogosM"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/DC_Comics_logo.png/600px-DC_Comics_logo.png"
                width="100px"
                alt="img"
                className="LogosM"
              />
              <img
                src="https://logodownload.org/wp-content/uploads/2017/05/marvel-logo-0.png"
                width="120px"
                alt="img"
                className="LogosM"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Warner_Bros_logo.svg/1200px-Warner_Bros_logo.svg.png"
                width="90px"
                alt="img"
                className="LogosM"
              />
              <img
                src="https://logos-world.net/wp-content/uploads/2021/11/Universal-Logo.png"
                width="130px"
                alt="img"
                className="LogosM"
              />
            </div>
          </div>
          <div>
            <p className="pMmembership">START ENJOYING THE BEST STORIES</p>
            <p className="pMmembership">MADE ESPECIALLY FOR YOU</p>
          </div>
          <div className="contMembership">
            <div className="cardP">
              <p className="titleP">Silver</p>
              <div className="pricecontainerP">
                <p className="priceP">U$D 19.99</p>
                <p className="pricedescriptor">/month</p>
              </div>
              <p className="includesP">This Plan Includes:</p>
              <ul className="benefitlistP">
                <li>Full HD 1080pi</li>
                <li>20 movies</li>
                <li>Fav list</li>
              </ul>
          
              <button className="btn" onClick={handleSubmitSilver}> Button</button> 
            </div>
            <div className="cardP1">
              <p className="titleP1">Gold</p>
              <div className="pricecontainerP">
                <p className="priceP">U$D 24.99</p>
                <p className="pricedescriptor">/month</p>
              </div>
              <p className="includesP">This Plan Includes:</p>
              <ul className="benefitlistP">
                <li>Full HD 4k</li>
                <li>40 movies</li>
                <li>Fav list</li>
              </ul>
              <button className="btn1" onClick={handleSubmitGold} > Button</button>
            </div>
          </div>
          <div>
            <div className="conteiner-shop-plan">
              <div className="containerLanding">
              </div>
              <div>   
              </div>
              <div className="carrusel">
                <Carrusel array={moviesCarrusel} />
              </div>
              <Footer/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
