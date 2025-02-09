import React, { useContext } from "react";
import { Context } from "../../store/appContext.js";

export const Characters = () => {
    const { store } = useContext(Context)
    const handleImgError = (event) => {
        event.target.src = "https://starwars-visualguide.com/assets/img/big-placeholder.jpg"
    }
    return (
        <div className="container bg-black">
            <h1 className="text-center p-4">Characters</h1>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4">
                {store.characters.map((item) => (
                    <div key={item.uid} className="col">
                        <div className="card" style={{height: "auto" , width: "15rem" }}>
                            <img className="card-img-top" src={`https://starwars-visualguide.com/assets/img/characters/${item.uid}.jpg`} alt="Card image cap"
                            onError={handleImgError} />
                            <div className="card-body">
                                <h5 className="card-title">{item.name}</h5>
                                <a href="#" className="btn btn-primary">Learn more</a>
                            </div>
                        </div>
                    </div>
                    ))}
            </div>
        </div>
    )
}