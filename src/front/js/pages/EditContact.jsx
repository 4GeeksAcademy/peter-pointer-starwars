import React, { useContext, useState } from "react";
import { Context } from "../store/appContext.js";
import { Link, useNavigate } from "react-router-dom";


export const EditContact = () => {
    const { store, actions } = useContext(Context);
    const person = store.currentContacts;
    const navigate = useNavigate()

    const [name, setName] = useState(person.name);
    const [email, setEmail] = useState(person.email);
    const [phone, setPhone] = useState(person.phone);
    const [address, setAddress] = useState(person.address);

    const handleSave = () => {
        const dataToSend = {
            name,
            email,
            phone,
            address            
        };

        actions.updateContact(dataToSend, person.id);
        navigate("/contact");
    };


    return (
        <form className="container rounded bg-body-secondary mt-4 fw-medium">
            <div className="container mt-5">
                <h2 className="text-center pt-3">Edit contact</h2>
                <div className="row mb-3">
                    <label htmlFor="colFormLabel" className="form-label">Full Name</label>
                    <input type="email" className="form-control" id="colFormLabel" placeholder="Full Name"
                        value={name} onChange={(event) => { setName(event.target.value) }} />
                </div>
                <div className="row mb-3">
                    <label htmlFor="colFormLabel" className="form-label">Email</label>
                    <input type="email" className="form-control" id="colFormLabel" placeholder="Enter e-mail"
                        value={email} onChange={(event) => { setEmail(event.target.value) }} />
                </div>
                <div className="row mb-3">
                    <label htmlFor="colFormLabel" className="form-label">Phone</label>
                    <input type="email" className="form-control" id="colFormLabel" placeholder="Enter Phone"
                        value={phone} onChange={(event) => { setPhone(event.target.value) }} />
                </div>
                <div className="row mb-3">
                    <label htmlFor="colFormLabel" className="form-label">Address</label>
                    <input type="email" className="form-control" id="colFormLabel" placeholder="Enter address"
                        value={address} onChange={(event) => { setAddress(event.target.value) }} />
                </div>
                <div className="row d-flex justify-content-center">
                    <button type="button" className="btn btn-primary col-6 mb-3" onClick={handleSave}>Save</button>
                    <Link to="/contact">
                        <button type="submit" className="btn btn-warning mb-3">Get back to contacts</button>
                    </Link>
                </div>
            </div>
        </form>
    )
}