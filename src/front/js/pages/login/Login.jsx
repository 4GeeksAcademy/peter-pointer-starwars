import React, { useContext, useState, useEffect } from "react";
import { Context } from "../../store/appContext.js";
import { useNavigate } from "react-router-dom";


export const Login = () => {
    const { actions } = useContext(Context);
    const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        const dataToSend = { email, password }
        console.log(dataToSend)
        actions.login(dataToSend);
        navigate("/")
    }

    useEffect(() => {
        actions.login();

    }, [navigate]);

    return (
        <div className="container mt-5">
            <h1 className="col-5 m-auto text-center">Login</h1>
            <form onSubmit={handleSubmit} className="col-5 m-auto">
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                        value={email} onChange={(e) => setEmail(e.target.value)} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1"
                        value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}