import React, { useContext, useState, } from "react";
import { Context } from "../../store/appContext.js";
import { useNavigate } from "react-router-dom";


export const Profile = () => {
    const { actions } = useContext(Context);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
        return <p>Loading...</p>; 
    }
    const [firstName, setFirstName] = useState(user.first_name);
    const [lastName, setLastName] = useState(user.last_name);
    const [email, setEmail] = useState(user.email);
    
    const editFirstName = (event) => setFirstName(event.target.value);
    const editLastName = (event) => setLastName(event.target.value);
    const editEmail = (event) => setEmail(event.target.value);
    
    const handleSubmitEdit = (event) => {
        event.preventDefault();
        const updatedUser = {
            first_name: firstName,
            last_name: lastName,
            email: email 
        };
        
        actions.updateProfile(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        navigate("/");
    };

    return (
        <div className="container mt-5">
            <h1 className="col-5 m-auto text-center mb-4">Profile</h1>
            <form className="card p-4 shadow" onSubmit={handleSubmitEdit}>
                <div className="text-center">
                    <img
                        src="https://img.freepik.com/premium-vector/user-icons-includes-user-icons-people-icons-symbols-premiumquality-graphic-design-elements_981536-526.jpg"
                        alt="User Profile"
                        className="rounded-circle mb-3"
                        style={{ width: "150px", height: "150px", objectFit: "cover" }}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">First Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={firstName}
                        onChange={editFirstName}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Last Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={lastName}
                        onChange={editLastName}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={editEmail}
                    />
                </div>
                
                <button className="btn btn-primary w-100 py-2 p-4" type="submit">
                    Save changes
                </button>
            </form>
        </div>
    );
};