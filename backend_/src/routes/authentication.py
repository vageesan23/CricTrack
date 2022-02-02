from src.repo.UserRepository import UserRepository
from fastapi import APIRouter, Body, Depends, HTTPException
from starlette.status import HTTP_201_CREATED, HTTP_400_BAD_REQUEST
from starlette.responses import JSONResponse, Response
from http import HTTPStatus
from src.config import database

from src.models.schemas.schemas import (
    UserInCreate,
    UserInLogin,
    UserInResponse,
    UserWithToken,
    UserInDB,
    UserRegister
)

from src.models.user import User
from src.services import jwt
# from src.services.authentication import check_email_is_taken, check_username_is_taken
from sqlalchemy.exc import IntegrityError
from src.config.database import db
from src.app.errors import EntityDoesNotExist
from src.services.authentication import change_password

app = APIRouter()
from starlette.config import Config
config = Config("../.env")

@app.post(
    "/register",
    status_code=HTTP_201_CREATED,
    response_model=UserInResponse,
    name="auth:register",
)

async def register(user: UserInCreate):
    try:
        userInfo=UserRepository.check_username(user.username,user.email)
        # if userInfo is None:
        userInfo = UserInDB(username=user.username, email=user.email)
        userInfo.change_password(user.password)

        obj = User(**userInfo.dict())
        db.add(obj)
        db.commit()        
        return UserInResponse(
                user=UserRegister(
                    username=userInfo.username,
                    email=userInfo.email,
                    bio=userInfo.bio,
                    message="Successful",
                )
            )           
    except IntegrityError:
        db.rollback() 
        return JSONResponse(status_code=HTTPStatus.BAD_REQUEST, content={'error': 'user already exist'})

 


@app.post("/login", response_model=UserInResponse, name="auth:login")
async def login(user_login: UserInLogin):
    try:
        userInfo = UserRepository.get_user_by_email(user_login.email)
        if userInfo==None:
            raise HTTPException(status_code=400, detail="There is no user with the username you provided")
        user = UserInDB(username=userInfo.email, email=userInfo.email,password=userInfo.password,salt=userInfo.salt)
        user.check_password(user_login.password)

        if not user.check_password(user_login.password):
            raise HTTPException(status_code=400, detail="Username or Password is incorrect.Please Try Again")
        userId=userInfo.id
        token = jwt.create_access_token_for_user(userId, str('SECRET'))

        return UserInResponse(
                user=UserWithToken(
                    username=userInfo.username,
                    email=userInfo.email,
                    bio=userInfo.bio,
                    token=token,
                )
            )

    except IntegrityError:
        db.rollback() 
        return JSONResponse(status_code=HTTPStatus.BAD_REQUEST, content={'error': 'Something went wrong'})

  