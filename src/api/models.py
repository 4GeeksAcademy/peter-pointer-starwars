from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()


class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
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
                "last_name": self.last_name}
    

""" class Products(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=True, nullable=False)
    description = db.Column(db.String, unique=False, nullable=True)
    price = db.Column(db.Float, nullable=False)


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
    product_to = db.relationship("Products", foreign_keys=[product_id], backref=db.backref("bill_items", lazy="select")) """
   


class Medias(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.Enum("done",  name="ok"), nullable=False)
    url = db.Column(db.String, unique=True, nullable=False)
    


class Comments(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String, unique=False, nullable=False)
    


class Followers(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    following_id = db.Column(db.Integer, db.ForeignKey("users.id"))  # Columna de clave foranea 
    following_to = db.relationship("Users", foreign_keys=[following_id], backref=db.backref("following_to", lazy="select"))  
    follower_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    follower_to = db.relationship("Users", foreign_keys[follower_id], backref=db.backref("follower_to", lazy="select"))


class Posts(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=True)
    date = db.Column(db.DateTime, default=datetime)
    body = db.Column(db.String, nullable=False)
    img_url = db.Column(db.String, nullable=False)
    

class Characters(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=True)
    height = db.Column(db.String, nullable=True)
    mass = db.Column(db.String, nullable=True)
    hair_color = db.Column(db.String, nullable=True)
    skin_color = db.Column(db.String, nullable=True)
    eye_color = db.Column(db.String, nullable=True)
    birth_year = db.Column(db.String, nullable=True)
    gender = db.Column(db.String, nullable=True)
    

class Planets(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=True)
    diameter = db.Column(db.String, nullable=True)
    rotation_period = db.Column(db.String, nullable=True)
    orbital_period = db.Column(db.String, nullable=True)
    gravity = db.Column(db.String, nullable=True)
    population = db.Column(db.String, nullable=True)
    climate = db.Column(db.String, nullable=True)
    terrain = db.Column(db.String, nullable=True)


class CharacterFavorites(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    
    


class PlanetFavorites(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    
    