import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext.js";

export const Contacts = () => {
  const { store, actions } = useContext(Context)
  const navigate = useNavigate()


  const handleDelete = (id) => {
    const uri = `${store.base_url}/agendas/${store.user}/contacts/${id}`;
    actions.deleteContacts(uri)

  }

  const handleEdit = (contact) => {
    actions.setCurrentContacts(contact,);
    navigate("/edit-contact");
  }

  return (

    <div className="container bg-body-secondary rounded mt-5 p-2">
      <div className="container mt-4">
        <h1 className="text-center domine-uniquifier ">Agenda</h1>
        <div className="d-flex justify-content-end">
          <Link to="/add-contact">
            <button type="button" className="btn btn-success mb-3">Add contact</button>
          </Link>
        </div>
        {store.contacts.map((item) => (
          <div key={item.id} className="card mb-3 bg-warning-subtle fw-medium">
            <div className="row g-0">
              <div className="col-md-4 d-flex justify-content-center align-item-center m-auto">
                <img src={`https://randomuser.me/api/portraits/lego/${Math.floor(Math.random() * 9)}.jpg`} style={{ width: "auto", height: "150px" }} className="rounded" alt="profile picture" />
              </div>
              <div className="col-md-8">
                <div className="card-body d-grid m-3 ">
                  <div className="container text-end">
                    <span className="text-end fa-xl" onClick={() => handleEdit(item)}>
                      <i className="fas fa-edit text-secondary me-4 pointer" ></i>
                    </span>
                    <span className="text-end fa-xl" onClick={() => handleDelete(item.id)}>
                      <i className="fa fa-trash text-danger pointer"></i>
                    </span>
                  </div>
                  <h5 className="card-title mb-3">{item.name}</h5>
                  <p className="card-text text-secondary">
                    <span className="fa fa-location-dot me-3"></span>
                    {item.address}</p>
                  <p className="card-text text-secondary">
                    <span className="fa fa-phone me-3"></span>
                    {item.phone}
                  </p>
                  <p className="card-text text-secondary">
                    <span className="fa fa-envelope me-3"></span>
                    {item.email}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

  )
}
