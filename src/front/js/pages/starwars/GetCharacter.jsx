import React, { useContext } from "react";
import { Context } from "../../store/appContext.js";


export const GetCharacter = () => {
    const { store } = useContext(Context);

    if (!store.character.name) {
        return <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    }

    return (
        <div className="container m-auto">
            <div className="bg-black border border-warning card my-2">
                <h1 className="text-start mx-2">{store.character.name}</h1>
                <div className="row m-2 g-0">
                    <div className="col-md-7 col-lg-6 col-xl-5">
                        <img
                            src={`https://raw.githubusercontent.com/tbone849/star-wars-guide/refs/heads/master/build/assets/img/characters/${store.character.uid}.jpg`}
                            className="img-fluid rounded"
                            alt={store.character.name}
                            onError={(e) => {
                                e.target.src = "https://github.com/tbone849/star-wars-guide/blob/master/build/assets/img/big-placeholder.jpg?raw=true";
                            }}
                        />
                    </div>
                    <div className="col-md-5 col-lg-6 col-xl-7">
                        <div className="card-body fw-bold">
                            <p className="card-text">Height: {store.character.height}</p>
                            <p className="card-text">Mass: {store.character.mass}</p>
                            <p className="card-text">Hair color: {store.character.hair_color}</p>
                            <p className="card-text">Skin color: {store.character.skin_color}</p>
                            <p className="card-text">Eye color: {store.character.eye_color}</p>
                            <p className="card-text">Birth year: {store.character.birth_year}</p>
                            <p className="card-text">Gender: {store.character.gender}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};