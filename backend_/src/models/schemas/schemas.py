from typing import List, Optional

from pydantic import BaseModel,EmailStr, HttpUrl
from src.models.schemas.common import DateTimeModelMixin, IDModelMixin
from src.services import security
from datetime import datetime

class UserBase(BaseModel):
    email: str
class User(UserBase):
    username:str
    email:str
    password:Optional[str]
    bio:Optional[str]
    salt:Optional[str]
    is_active: Optional[bool]
    created_at:Optional[datetime]
    updated_at:Optional[datetime]
    class Config:
        orm_mode = True



class UserInLogin(UserBase):
    email: EmailStr
    password: str


class UserInCreate(UserInLogin):
   username: str


class UserInUpdate(BaseModel):
    username: Optional[str] = None
    email: Optional[EmailStr] = None
    password: Optional[str] = None
    bio: Optional[str] = None
    image: Optional[str] = None


class UserWithToken(User):
    token: str




class UserInUpdate(BaseModel):
    username: Optional[str] = None
    email: Optional[EmailStr] = None
    password: Optional[str] = None
    bio: Optional[str] = None
    image: Optional[str] = None


class UserWithToken(User):
    token: str

class UserRegister(User):
    message: str    


class UserInResponse(BaseModel):
    user: User


class GET_CURRENT_USER(User):
    id: int


class UserInDB(IDModelMixin, DateTimeModelMixin, User):
    salt: str = ""
    password: str = ""

    def check_password(self, password: str) -> bool:
        return security.verify_password(self.salt + password, self.password)

    def change_password(self, password: str) -> None:
        self.salt = security.generate_salt()
        self.password = security.get_password_hash(self.salt + password)