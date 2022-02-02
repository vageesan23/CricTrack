from src.repo.UserRepository import UserRepository
from typing import List

from fastapi import Depends, APIRouter, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError


from src.models.schemas import schemas

from src.models import user
from src.config.database import  engine
from src.config.database import db
from starlette.responses import JSONResponse
from http import HTTPStatus

user.Base.metadata.create_all(bind=engine)

app = APIRouter()




@app.get("/{user_id}", response_model=schemas.GET_CURRENT_USER)
def read_user(user_id: int):
    try:
        db_user = UserRepository.get_user(user_id=user_id)
        if db_user is None:
            raise HTTPException(status_code=404, detail="User not found")
        return db_user
    except IntegrityError:
        db.rollback() 
        return JSONResponse(status_code=HTTPStatus.BAD_REQUEST, content={'error': 'Something went wrong'})     

