from src.models.user import User
from src.config.database import db
from sqlalchemy import  and_
class UserRepository():
  def get_user_by_email(email):
      return db.query(User).filter(User.email == email).first()
  
  def check_username(username,email):
      return db.query(User).filter(and_(User.username == username),( User.email == email)).first()
    

  def get_user(user_id: int):
        return db.query(User).filter(User.id == user_id).first()


  def get_user_by_email(email: str):
    return db.query(User).filter(User.email == email).first()


  def get_users(skip: int = 0, limit: int = 100):
      return db.query(User).offset(skip).limit(limit).all()  