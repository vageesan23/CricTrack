# from src.repo import UsersRepository
# from app.db.errors import EntityDoesNotExist

from . import security
import bcrypt
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def change_password(password: str) -> None:
        salt = security.generate_salt()
        hashed_paspasswordsword = security.get_password_hash(salt + password)
        
def get_password_hash(password: str) -> str:
        return pwd_context.hash(password)


# async def check_username_is_taken(repo: UsersRepository, username: str) -> bool:
#     try:
#         await repo.get_user_by_username(username=username)
#     except EntityDoesNotExist:
#         return False

#     return True


# async def check_email_is_taken(repo: UsersRepository, email: str) -> bool:
#     try:
#         await repo.get_user_by_email(email=email)
#     except EntityDoesNotExist:
#         return False

#     return True
