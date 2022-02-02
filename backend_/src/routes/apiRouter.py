from fastapi import APIRouter

from . import user,batting,bowling,authentication

# uvicorn app.main:app --reload

router = APIRouter()


router.include_router(authentication.app, tags=["authentication"], prefix="/auth")
router.include_router(user.app, tags=["users"], prefix="/user")
router.include_router(batting.app, tags=["Batting"], prefix="/batting")
router.include_router(bowling.app, tags=["Bowling"], prefix="/bowling")

router.include_router(bowling.app, tags=["Bowling"], prefix="/bowling")
