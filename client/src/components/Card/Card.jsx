import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import '../Card.css';

function Card(){
    
    return (
        <>
        
            <div className="card" style="width: 17rem;">
            <img src="..." className="card-img-top" alt="cardImg" />
            <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" className="btn btn-primary">Go somewhere</a>
            </div>
            </div>
        </>
    )
}
export default Card;