import React, { useContext } from "react";
import { Context } from "../../store/appContext.js";
import { useNavigate } from "react-router-dom";

export const Planets = () => {
    const { store, actions } = useContext(Context)
    const handleImgError = (event) => {
        event.target.src = "https://github.com/tbone849/star-wars-guide/blob/master/build/assets/img/big-placeholder.jpg?raw=true"
    }
    const navigate = useNavigate()

    const handleDetails = (planet) => {
        actions.getPlanet(planet.uid)
        navigate("/planet")
    }
    const handleFavorite = (planet) => {
        if (store.favorites.some(fav => fav.uid === planet.uid)) {
            actions.removeFavorite(planet.uid);
        } else {
            actions.addFavorite(planet); 
        }
    };

    if (store.planets.length == 0) {
        return (
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    }

    return (
        <div className="container bg-black">
            <h1 className="text-center p-4">Planets</h1>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4">
                {store.planets.map((item) => (
                    <div key={item.uid} className="col">
                        <div className="card" style={{ height: "auto", width: "15rem" }}>
                            <img className="card-img-top" src={`https://raw.githubusercontent.com/tbone849/star-wars-guide/refs/heads/master/build/assets/img/planets/${item.uid}.jpg`} alt="Card image cap"
                                onError={handleImgError} />
                            <div className="card-body">
                                <h5 className="card-title">{item.name}</h5>
                                <div className="d-flex justify-content-between">
                                    <span onClick={() => handleDetails(item)} className="btn btn-primary">Learn more</span>
                                    <button type="button" className="btn btn-outline-warning" onClick={() => handleFavorite(item)}><i className={`fa-${store.favorites.some(fav => fav.uid === item.uid) ? "solid" : "regular"} fa-heart fa-xl`}></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}