import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../store/appContext";


export const AddContact = () => {
    const { actions } = useContext(Context);
    const navigate = useNavigate()

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    const handleSubmitAdd = (event) => {
        event.preventDefault();

        const newContact = {
            name,
            email,
            phone,
            address
        };

        actions.addContact(newContact)
        navigate("/contact");
    }


    return (

        <form onSubmit={handleSubmitAdd} className="container rounded bg-dark mt-4 fw-medium">
            <div className="container mt-5">
                <h2 className="text-center pt-3">Add a new contact</h2>
                <div className="row mb-3">
                    <label htmlFor="colFormLabel" className="form-label">Full Name</label>
                    <input type="text" className="form-control" id="colFormLabel" placeholder="Full Name"
                        value={name} onChange={(event) => { setName(event.target.value) }} />
                </div>
                <div className="row mb-3">
                    <label htmlFor="colFormLabel" className="form-label">Email</label>
                    <input type="email" className="form-control" id="colFormLabel" placeholder="Enter e-mail"
                        value={email} onChange={(event) => { setEmail(event.target.value) }} />
                </div>
                <div className="row mb-3">
                    <label htmlFor="colFormLabel" className="form-label">Phone</label>
                    <input type="text" className="form-control" id="colFormLabel" placeholder="Enter Phone"
                        value={phone} onChange={(event) => { setPhone(event.target.value) }} />
                </div>
                <div className="row mb-3">
                    <label htmlFor="colFormLabel" className="form-label">Address</label>
                    <input type="text" className="form-control" id="colFormLabel" placeholder="Enter address"
                        value={address} onChange={(event) => { setAddress(event.target.value) }} />
                </div>
                <div className="row d-flex justify-content-center">
                    <button type="submit" className="btn btn-primary col-6 mb-3">Save</button>
                    <Link to="/contact">
                        <button type="submit" className="btn btn-warning mb-3">Get back to contacts</button>
                    </Link>
                </div>
            </div>
        </form>
    )

}