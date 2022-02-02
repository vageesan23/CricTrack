from sqlalchemy import Boolean, Column, ForeignKey, Integer, String,DateTime
from sqlalchemy.orm import relationship
import datetime
from src.config.database import Base


class Batting(Base):
    __tablename__ = "batting"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    shotType = Column(String(50), index=True)
    accuracy = Column(String(50), index=True)
    date = Column(DateTime, default=datetime.datetime.utcnow)

    user = relationship("User", back_populates="batting")



