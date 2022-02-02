from sqlalchemy import Boolean, Column, ForeignKey, Integer, String,DateTime
from sqlalchemy.orm import relationship
import datetime
from src.config.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, index=True)
    email = Column(String(50), unique=True, index=True)
    bio = Column(String(200), unique=True, index=True)
    image: Column(String(200), unique=True, index=True)
    salt = Column(String(500))
    password = Column(String(500))
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow)

    batting = relationship("Batting", back_populates="user")
    bowling = relationship("Bowling", back_populates="user")