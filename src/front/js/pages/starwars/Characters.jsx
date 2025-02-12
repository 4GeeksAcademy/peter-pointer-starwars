import React, { useContext } from "react";
import { Context } from "../../store/appContext.js";
import { useNavigate } from "react-router-dom";

export const Characters = () => {
    const { store, actions } = useContext(Context)
    const handleImgError = (event) => {
        event.target.src = "https://github.com/tbone849/star-wars-guide/blob/master/build/assets/img/big-placeholder.jpg?raw=true"
    }
    const navigate = useNavigate()

    const handleDetails = (character) => {
        actions.getCharacter(character.uid)
        navigate("/character")
    }
    
    const handleFavorite = (character) => {
        if (store.favorites.some(fav => fav.uid === character.uid)) {
            actions.removeFavorite(character.uid); 
        } else {
            actions.addFavorite(character); 
        }
    };

    if (store.characters.length == 0) {
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
            <h1 className="text-center p-4">Characters</h1>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4">
                {store.characters.map((item) => (
                    <div key={item.uid} className="col">
                        <div className="card" style={{ height: "auto", width: "15rem" }}>
                            <img className="card-img-top" src={`https://raw.githubusercontent.com/tbone849/star-wars-guide/refs/heads/master/build/assets/img/characters/${item.uid}.jpg`} alt="Card image cap"
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