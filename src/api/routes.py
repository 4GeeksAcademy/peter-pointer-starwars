"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from api.models import db, Users, CharacterFavorites, PlanetFavorites
import requests
from flask_jwt_extended import create_access_token
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import get_jwt


api = Blueprint('api', __name__)
CORS(api) # Allow CORS requests to this API


@api.route('/users', methods=["GET"])
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


# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.


@api.route('/users', methods=['POST'])
def register_user():
    response_body = {}
    data = request.json
    
    row = Users(first_name=data.get('first_name', ""), last_name=data.get('last_name', ""), email=data['email'], password=data['password'], is_admin=data.get('is_admin', False), is_active=data.get("is_active", True))
    db.session.add(row)
    db.session.commit()
    
    user = row.serialize()
    claims = {'user_id': user['id'],
              'is_admin': user['is_admin']}
    print(claims)

    access_token = create_access_token(identity=user["email"], additional_claims=claims)
    response_body['message'] = 'User registered!'
    response_body['access_token'] = access_token
    response_body['results'] = user
    return response_body, 200


@api.route('/users', methods=['PUT'])
@jwt_required()
def edit_user():
    response_body = {}
    data = request.json
    user_id = get_jwt()['user_id']
    row = Users.query.get(user_id)
    if not row:
        response_body['message'] = 'User not found'
        return response_body, 404
    row.first_name = data.get('first_name', row.first_name)  
    row.last_name = data.get('last_name', row.last_name)
    row.email = data.get('email', row.email)
    row.password = data.get('password', row.password) 
    row.is_admin = data.get('is_admin', row.is_admin)
    db.session.commit()
    response_body['message'] = 'User edited'
    response_body['results'] = row.serialize()
    return response_body, 200


@api.route("/login", methods=["POST"])
def login():
    response_body = {}
    data = request.json
    email = data.get("email", None)
    password = data.get("password", None)
    row = db.session.execute(db.select(Users).where(Users.email==email, Users.password==password, Users.is_active)).scalar()
    # Si la consulta es exitosa, row tendra algo (por lo tanto es verdadero), sino devuelve None
    if not row:
        response_body['message'] = "Bad username or password"
        return response_body, 401
    user = row.serialize()
    claims = {'user_id': user['id'],
              'is_admin': user['is_admin']}
    print(claims)

    access_token = create_access_token(identity=email, additional_claims=claims) 
    response_body['message'] = 'User logged!'
    response_body['access_token'] = access_token
    response_body["results"] = user
    return response_body, 200


# Protect a route with jwt_required, which will kick out requests
# without a valid JWT present.
@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    response_body = {}
    current_user = get_jwt_identity()
    additional_claims = get_jwt()  # Los datos adicionales
    response_body['message'] = f'User logged: {current_user} - {additional_claims}'
    return response_body, 200


@api.route('/users/<int:user_id>', methods=['GET'])
def user_id(user_id):
    response_body = {}
    url = f'https://jsonplaceholder.typicode.com/users/{user_id}'
    response = requests.get(url)
    print(response)
    if response.status_code == 200:
        data = response.json()
        response_body['message'] = 'Un usuario'
        response_body['results'] = data
        return response_body, 200
    response_body['message'] = 'algo salió'
    return response_body, 400


@api.route('/characters', methods=['GET'])
def characters():
    response_body = {}
    url = 'https://swapi.tech/api/people'
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        print(data['results'])
        response_body['message'] = 'Listado de Personajes'
        response_body['results'] = data['results']
        return response_body, 200
    response_body['message'] = 'algo salió mal'
    return response_body, 400


@api.route('/characters/<int:character_id>', methods=['GET'])
def character(character_id):
    response_body = {}
    url = f'https://swapi.tech/api/people/{character_id}'
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        print(data['result'])
        response_body['message'] = 'Detalles del Personaje'
        response_body['results'] = data['result']['properties']
        return response_body, 200
    response_body['message'] = 'algo salió mal'
    return response_body, 400


@api.route('/planets', methods=['GET'])
def planets():
    response_body = {}
    url = 'https://swapi.tech/api/planets'
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        print(data['results'])
        response_body['message'] = 'Listado de Planetas'
        response_body['results'] = data['results']
        return response_body, 200
    response_body['message'] = 'algo salió mal'
    return response_body, 400


@api.route('/planets/<int:planet_id>', methods=['GET'])
def planet(planet_id):
    response_body = {}
    url = f'https://swapi.tech/api/planets/{planet_id}'
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        print(data['result'])
        response_body['message'] = 'Detalles del Planeta'
        response_body['results'] = data['result']['properties']
        return response_body, 200
    response_body['message'] = 'algo salió mal'
    return response_body, 400


@api.route('/users/<int:user_id>/favorites-planets', methods=['GET', 'POST'])
def user_favorites_planets(user_id):
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(PlanetFavorites).where(PlanetFavorites.user_id == user_id)).scalars()
        result_planets = [row.serialize() for row in rows]
        response_body["message"] = f"Listado de Planetas Favoritos del usuario {user_id}"
        response_body["results"] = result_planets
        return response_body, 200
    if request.method == 'POST':
        data = request.json
        row = PlanetFavorites(planet_id=data['planet_id'], user_id=user_id )
        db.session.add(row)
        db.session.commit()
        response_body['message'] = f'Se guardo exitosamente'
        return response_body, 200
    

@api.route('/users/<int:user_id>/favorites-characters', methods=['GET', 'POST'])
def user_favorites_characters(user_id):
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(CharacterFavorites).where(CharacterFavorites.user_id == user_id)).scalars()
        result_characters = [row.serialize() for row in rows]
        response_body["message"] = f"Listado de Characters Favoritos del usuario {user_id}"
        response_body["results"] = result_characters
        return response_body, 200
    if request.method == 'POST':
        data = request.json
        row = CharacterFavorites(character_id=data['character_id'], user_id=user_id )
        db.session.add(row)
        db.session.commit()
        response_body['message'] = f'Se guardo exitosamente'
        return response_body, 200


@api.route("/users/<int:user_id>/favorite-characters/<int:character_id>", methods=['DELETE'])
def delete_user_favorites_character(user_id, character_id):
    response_body = {}
    row = db.session.execute(db.select(CharacterFavorites).where(CharacterFavorites.user_id == user_id, CharacterFavorites.character_id == character_id)).scalar()
    db.session.delete(row)
    db.session.commit()
    response_body["message"] = "Se borró con éxito"
    return response_body, 200 


@api.route("/users/<int:user_id>/favorite-planets/<int:planet_id>", methods=['DELETE'])
def delete_user_favorites_planet(user_id, planet_id):
    response_body = {}
    row = db.session.execute(db.select(PlanetFavorites).where(PlanetFavorites.user_id == user_id, PlanetFavorites.planet_id == planet_id)).scalar()
    db.session.delete(row)
    db.session.commit()
    response_body["message"] = "Se borró con éxito"
    return response_body, 200 


""" @api.route("/characters", methods=["GET"])
def characters():
    response_body = {}
    rows = db.session.execute(db.select(Characters)).scalars()
    # Opcion 2
    # variable = [target for individual in iterable]
    results = [row.serialize() for row in rows]
    response_body["message"] = f"Listado de Characters"
    response_body["results"] = results
    return response_body, 200 """


""" @api.route("/planets", methods=["GET"])
def planets():
    response_body = {}
    rows = db.session.execute(db.select(Planets)).scalars()
    # Opcion 2
    # variable = [target for individual in iterable]
    results = [row.serialize() for row in rows]
    response_body["message"] = f"Listado de Planets"
    response_body["results"] = results
    return response_body, 200 """


""" @api.route("/products", methods=["GET", "POST"])
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
        return response_body, 200 """


""" @api.route("/products/<int:id>", methods=["GET", "PUT", "DELETE"])
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
        return response_body, 200 """


""" # Quiero obtener todos los estudiantes de la cohorte 93
@api.route("/cohorts/<int:cohort_id>/students", methods=["GET"])
def cohorts_students(cohort_id):
    response_body = {}
    # lógica para retornar esos datos
    return response_body, 200 """
