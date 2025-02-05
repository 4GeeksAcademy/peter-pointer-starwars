import React from "react";

export const EditContact = () => {

    return (

        <form className="container rounded bg-body-secondary mt-4 fw-medium">           
                        <div className="container mt-3">
                            <h2 className="text-center pt-3">Edit contact</h2>
                            <div className="row mb-3">
                                <label htmlFor="colFormLabel" className="form-label">Full Name</label>
                                <input type="email" className="form-control" id="colFormLabel" placeholder="Full Name" />
                            </div>
                            <div className="row mb-3">
                                <label htmlFor="colFormLabel" className="form-label">Email</label>
                                <input type="email" className="form-control" id="colFormLabel" placeholder="Enter e-mail" />
                            </div>
                            <div className="row mb-3">
                                <label htmlFor="colFormLabel" className="form-label">Phone</label>
                                <input type="email" className="form-control" id="colFormLabel" placeholder="Enter Phone" />
                            </div>
                            <div className="row mb-3">
                                <label htmlFor="colFormLabel" className="form-label">Address</label>
                                <input type="email" className="form-control" id="colFormLabel" placeholder="Enter address" />
                            </div>
                            <div className="row d-flex justify-content-center">
                                <button type="button" className="btn btn-primary col-6 mb-3">Save</button>
                                <Link to="/contact">
                                    <span className="text-success">Get back to contacts</span>
                                </Link>
                            </div>                    
                        </div>            
                </form>
    )
}