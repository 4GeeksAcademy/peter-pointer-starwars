import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const Contacts = () => {

  const [contacts, setContacts] = useState(["1", "2"])
  const base_url = "https://playground.4geeks.com/contact"
  const user = "pedro88"

  useEffect(() => { getContacts() }, [])

  // GET Method
  const getContacts = async () => {
    const uri = `${base_url}/agendas/${user}/contacts`
    const options = { method: "GET" }
    const response = await fetch(uri, options)
    if (!response.ok) {
      console.log("Error:", response.status, response.statusText)
      return
    }
    const data = await response.json()
    setContacts(data.contacts)
  }

  // DELETE Method
  const deleteContacts = async (id) => {
    const uri = `${base_url}/agendas/${user}/contacts/${id}`
    const options = { method: "DELETE" }
    const response = await fetch(uri, options)
    if(!response.ok) {
      console.log("Error:", response.status, response.statusText)
      return
    }
    
    getContacts()
  }

  const handleDelete = (id) => {
    deleteContacts(id)
  }


  return (

    <div className="container bg-body-secondary rounded mt-4 p-2">
      <div className="container mt-4">
        <h1 className="text-center">Agenda</h1>
        <div className="d-flex justify-content-end">
          <Link to="/add-contact">
            <button type="button" className="btn btn-success mb-3">Add contact</button>
          </Link>
        </div>
        {contacts.map((item) => (
          <div className="card mb-3 bg-warning-subtle fw-medium">
            <div className="row g-0">
              <div className="col-md-4 d-flex justify-content-center align-item-center m-auto">
                <img src={`https://randomuser.me/api/portraits/lego/${Math.floor(Math.random()*9)}.jpg`} style={{width: "auto", height: "150px"}} className="rounded-start" alt="profile picture" />
              </div>
              <div className="col-md-8">
                <div className="card-body d-grid m-3 ">
                  <div className="container d-flex justify-content-between">
                    <h5 className="card-title mb-3">{item.name}</h5>
                    <span className="text-end fa-xl">
                      <i className="fas fa-edit text-secondary me-4"></i>
                      <i className="fa fa-trash text-danger pointer" onClick={() => handleDelete(item.id)}></i>
                    </span>
                  </div>
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
