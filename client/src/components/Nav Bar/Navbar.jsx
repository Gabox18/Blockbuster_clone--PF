import React  from "react";
import Logoutbutton from "../User/Logout";
import './Navbar.css';
import FilteringSorting  from './filtering&sorting/filtering&sorting.jsx';
import Searchbar from "./search bar/search.jsx";
import img from '../../assets/Logo.png';
import { useAuth0 } from "@auth0/auth0-react";
import {Link} from 'react-router-dom'
import LoginButton from "../User/Login";


function Navbar(prop){
    const { user, isAuthenticated, loginWithRedirect } = useAuth0();
    console.log(user)
    return (
        <>
            <nav className="navbar bg-dark navbar-expand-lg bg-light">
                <div className="container-fluid">
                    <div className="navbar-brand text-light">
                        <img src={img} width='80px' alt="logo" />
                    </div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <FilteringSorting setCurrentPage={prop.setCurrentPage}/>
                        </ul>
                        <Searchbar setCurrentPage={prop.setCurrentPage}/>
                        {isAuthenticated
                            ?<>
                                <Link to={'/profile'}>
                                    <img src={user.picture} alt="profile" width={'40px'} className='imgPerfil'/>
                                </Link>
                                <Logoutbutton/>
                            </>
                            :<button className='btn btn-outline-primary text-light' onClick={()=>loginWithRedirect()}>Login</button>
                            } 
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar;