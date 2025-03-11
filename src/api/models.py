from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()


class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    is_admin = db.Column(db.Boolean(), nullable=False)
    first_name = db.Column(db.String, nullable=True)
    last_name = db.Column(db.String)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        # Do not serialize the password, its a security breach
        return {"id": self.id,
                "email": self.email,
                "is active": self.is_active,
                "first_name": self.first_name,
                "last_name": self.last_name,
                "is_admin": self.is_admin}
    

class Medias(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.Enum("done",  name="ok"), nullable=False)
    url = db.Column(db.String, unique=True, nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey("posts.id"))
    post_to = db.relationship("Posts", foreign_keys=[post_id], backref=db.backref("medias_to", lazy="select"))


class Comments(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String, unique=False, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    user_to = db.relationship("Users", foreign_keys=[user_id], backref=db.backref("comments_to", lazy="select"))
    post_id = db.Column(db.Integer, db.ForeignKey("posts.id"))
    post_to = db.relationship("Posts", foreign_keys=[post_id], backref=db.backref("comments_to", lazy="select"))
    

class Followers(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    following_id = db.Column(db.Integer, db.ForeignKey("users.id"))  # Columna de clave foranea 
    following_to = db.relationship("Users", foreign_keys=[following_id], backref=db.backref("following_to", lazy="select"))  
    follower_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    follower_to = db.relationship("Users", foreign_keys=[follower_id], backref=db.backref("follower_to", lazy="select"))


class Posts(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=True)
    date = db.Column(db.DateTime, default=datetime.utcnow())
    body = db.Column(db.String, nullable=False)
    img_url = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    user_to = db.relationship("Users", foreign_keys=[user_id], backref=db.backref("posts_to", lazy="select"))
    

class Characters(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    height = db.Column(db.String)
    mass = db.Column(db.String)
    hair_color = db.Column(db.String)
    skin_color = db.Column(db.String)
    eye_color = db.Column(db.String)
    birth_year = db.Column(db.String)
    gender = db.Column(db.String)
    
    def __repr__(self):
        return f"<Characters: {self.id} - {self.name}>"

    def serialize(self):
        return {"id": self.id,
                "name": self.name,
                "height": self.height,
                "mass": self.mass,
                "hair_color": self.hair_color,
                "skin_color": self.skin_color,
                "eye_color": self.eye_color,
                "birth_year": self.birth_year,
                "gender": self.gender}

    
class Planets(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    diameter = db.Column(db.String)
    rotation_period = db.Column(db.String)
    orbital_period = db.Column(db.String)
    surface_water = db.Column(db.String)
    gravity = db.Column(db.String)
    population = db.Column(db.String)
    climate = db.Column(db.String)
    terrain = db.Column(db.String)

    def __repr__(self):
        return f'<Character: {self.id} - {self.name}>'

    def serialize(self):
        return {"id": self.id,
                "name": self.name,
                "climate": self.climate,
                "surface_water": self.surface_water,
                "diameter": self.diameter,
                "rotation_period": self.rotation_period,
                "terrain": self.terrain,
                "gravity": self.gravity,
                "orbital_period": self.orbital_period,
                "population": self.population}


class PlanetFavorites(db.Model):
    __tablename__= "planet_favorites"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    user_to = db.relationship("Users", foreign_keys=[user_id], backref=db.backref("planetfavorites_to", lazy="select"))
    planet_id = db.Column(db.Integer, db.ForeignKey("planets.id"))
    planet_to = db.relationship("Planets", foreign_keys=[planet_id], backref=db.backref("planets_to", lazy="select"))

    def __repr__(self):
        return f"<PlanetFavorites: {self.id}>"
    def serialize(self):
         return {"id": self.id,
                 "user_id": self.user_id,
                 "planet_id": self.planet_id}


class CharacterFavorites(db.Model):
    __tablename__= "character_favorites"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    user_to = db.relationship("Users", foreign_keys=[user_id], backref=db.backref("characterfavorites_to", lazy="select"))
    character_id = db.Column(db.Integer, db.ForeignKey("characters.id"))
    character_to = db.relationship("Characters", foreign_keys=[character_id], backref=db.backref("characters_to", lazy="select"))

    def __repr__(self):
        return f"<CharacterFavorites: {self.id}>"
    def serialize(self):
         return {"id": self.id,
                 "user_id": self.user_id,
                 "character_id": self.character_id}
    
    
class Products(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=True, nullable=False)
    description = db.Column(db.String, unique=False, nullable=True)
    price = db.Column(db.Float, nullable=False)

    def __repr__(self):
        return f"<Product: {self.name}>"

    def serialize(self):
        return {"id": self.id,
                "name": self.name,
                "description": self.description,
                "price": self.price}
    

class Bills(db.Model):
    __tablename__ = "bills"
    id = db.Column(db.Integer, primary_key=True)
    create_at = db.Column(db.DateTime, nullable=False, default=datetime)  # Default, el dia de creacion
    total = db.Column(db.Float, nullable=False)
    bill_address = db.Column(db.String)
    status = db.Column(db.Enum("pending", "paid", "cancel", name="status"), nullable=False)
    payment_method = db.Column(db.Enum("visa", "amex", "paypal", name="payment"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    user_to = db.relationship("Users", foreign_keys=[user_id], backref=db.backref("bills_to", lazy="select"))


class BillItems(db.Model):
    __tablename__ = "bill_items"
    id = db.Column(db.Integer, primary_key=True)
    price_per_unit = db.Column(db.Float, nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    total_price = db.Column(db.Float, nullable=False) 
    bill_id = db.Column(db.Integer, db.ForeignKey("bills.id"))
    bill_to = db.relationship("Bills", foreign_keys=[bill_id], backref=db.backref("bill_items", lazy="select"))
    product_id = db.Column(db.Integer, db.ForeignKey("products.id"))
    product_to = db.relationship("Products", foreign_keys=[product_id], backref=db.backref("bill_items", lazy="select"))    
    