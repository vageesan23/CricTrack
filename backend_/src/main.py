from typing import List

from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session

from src.models import user,batting,bowling
from src.config.database import SessionLocal, engine

from fastapi import FastAPI
from fastapi.exceptions import RequestValidationError
from starlette.exceptions import HTTPException
from starlette.middleware.cors import CORSMiddleware


from src.routes.apiRouter import router as api_router

user.Base.metadata.create_all(bind=engine)
batting.Base.metadata.create_all(bind=engine)
bowling.Base.metadata.create_all(bind=engine)

app = FastAPI()


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


PREFIX='/api'

def get_application() -> FastAPI:
    application = FastAPI(title='CricTrack API Service', debug='DEBUG', version='0.1')

    application.add_middleware(
        CORSMiddleware,
        allow_origins="*",
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    application.include_router(api_router, prefix=PREFIX,)

    return application


app = get_application()








