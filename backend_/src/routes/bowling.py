from typing import List

from fastapi import Depends, APIRouter, HTTPException
from sqlalchemy.orm import Session



from src.models.schemas import bowlingSchema

from src.models.bowling import Bowling
from src.config.database import SessionLocal, engine



app = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/wicket-taking-percentage/", response_model=bowlingSchema.BowlingCreate)
def create_wicket_taking_percentage(bowlingObj: bowlingSchema.BowlingCreate, db: Session = Depends(get_db)):
    db_user = Bowling(user_id=bowlingObj.user_id,wicketTakingPercentage=bowlingObj.wicketTakingPercentage, suggestion=bowlingObj.suggestion,speed=bowlingObj.speed)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

