"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from api.models import db, Users, Products


api = Blueprint('api', __name__)
CORS(api) # Allow CORS requests to this API


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {}
    response_body["message"] = "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    return response_body, 200


@api.route("/users", methods=["GET"])
def users():
    response_body = {}
    rows = db.session.execute(db.select(Users)).scalars()
    # Opcion 1
    # results = []
    # for row in rows:
    #    results.append(row.serialize())
    # Opcion 2
    # variable = [target for individual in iterable]
    results = [row.serialize() for row in rows]
    response_body["message"] = f"Listado de Usuarios"
    response_body["results"] = results
    return response_body, 200


@api.route("/products", methods=["GET", "POST"])
def products():
    response_body = {}
    if request.method == "GET":
        rows = db.session.execute(db.select(Products)).scalars()
        results = [row.serialize() for row in rows]
        response_body["results"] = results
        response_body["message"] = f"Respuesta para el metodo {request.method}"
        return response_body, 200
    if request.method == "POST":
        data = request.json
        #  Print(data, type(data))
        row = Products(name=data["name"],
                       description=data.get("description", "n/a"),
                       price=data["price"])
        db.session.add(row)
        db.session.commit()
        response_body["message"] = f"Respuesta para el metodo {request.method}"
        response_body["results"] = row.serialize()
        return response_body, 200


@api.route("/products/<int:id>", methods=["GET", "PUT", "DELETE"])
def product(id):
    response_body = {}
    row = db.session.execute(db.select(Products).where(Products.id == id)).scalar()
    print(row)
    if not row:
        response_body["message"] = f"El producto id {id} no existe"
        return response_body, 404
    # TODO: Validar que el usuario pueda ver, modificar o borrar el producto
    if request.method == "GET":
        response_body["result"] = row.serialize()
        response_body["message"] = f"Respuesta para el metodo {request.method} del id: {id}"
        return response_body, 200
    if request.method == "PUT":
        data = request.json
        print("row", )
        print("data", data)
        row.name = data.get("name")
        row.description = data.get("description", "n/a")
        row.price = data["price"]
        db.session.commit()
        response_body["message"] = f"Respuesta para el metodo {request.method} del id: {id}"
        response_body["results"] = row.serialize()
        return response_body, 200
    if request.method == "DELETE":
        # La pregunta es: Borro o deshabilito ?
        db.session.delete(row)
        db.session.commit()
        response_body["message"] = f"Hemos borrado el producto id {id}"
        response_body["results"] = {}
        return response_body, 200


