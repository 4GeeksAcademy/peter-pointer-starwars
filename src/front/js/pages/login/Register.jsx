import React, { useContext, useState } from "react";
import { Context } from "../../store/appContext.js";
//import "../../styles/home.css";
import { useNavigate } from "react-router-dom";

export const Register = () => {
    const { actions } = useContext(Context);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [viewPassword, setViewPassword] = useState(false);
    const navigate = useNavigate()

    const handleFirstName = (event) => { setFirstName(event.target.value) }
    const handleLastName = (event) => { setLastName(event.target.value) }
    const handleEmail = (event) => { setEmail(event.target.value) }
    const handlePassword = (event) => { setPassword(event.target.value) }
    const handleViewPassword = () => { setViewPassword(!viewPassword) }

    const handleSubmit = (event) => {
        event.preventDefault();
        const dataToSend = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: password
        }
        actions.register(dataToSend);

        navigate('/')
    }

    return (
        <div className="container mt-5">
            <form className="col-4 m-auto" onSubmit={handleSubmit}>
                <h1 className="col-5 m-auto text-center mb-4">Register</h1>
                <div className="form-floating">
                    <input type="text" className="form-control" placeholder="enter your first name" value={firstName} onChange={handleFirstName} />
                    <label htmlFor="floatingInput">First Name</label>
                </div>
                <div className="form-floating">
                    <input type="text" className="form-control" placeholder="enter your last name" value={lastName} onChange={handleLastName} />
                    <label htmlFor="floatingInput">Last Name</label>
                </div>
                <div className="form-floating">
                    <input type="email" className="form-control" placeholder="name@example.com" value={email} onChange={handleEmail} />
                    <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating">
                    <input type={viewPassword ? 'text' : 'password'} className="form-control" id="floatingPassword" placeholder="Password" value={password} onChange={handlePassword} />
                    <label htmlFor="floatingPassword">Password</label>
                    <span className="input-group-text" onClick={handleViewPassword}>
                        {viewPassword ?
                            <i className="fa fa-eye-slash"></i>
                            :
                            <i className="fa fa-eye"></i>
                        }
                    </span>
                </div>
                <button className="btn btn-primary w-100 py-2" type="submit">Register</button>
                <div className="text-center mt-3">
                    <span>Ya tienes cuenta? </span>
                    <a onClick={() => navigate("/login")} href="#">Log in</a>
                </div>
            </form>
        </div>
    );
};