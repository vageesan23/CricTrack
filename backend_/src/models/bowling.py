from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from src.config.database import Base


class Bowling(Base):
    __tablename__ = "bowling"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    wicketTakingPercentage = Column(String(50), index=True)
    suggestion = Column(String(50), index=True)
    speed = Column(String(50), index=True)

    user = relationship("User", back_populates="bowling")

