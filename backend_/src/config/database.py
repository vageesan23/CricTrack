from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from starlette.config import Config
from loguru import logger
config = Config(".env1")
from starlette.datastructures import CommaSeparatedStrings, Secret


MAX_CONNECTIONS_COUNT: int = config("MAX_CONNECTIONS_COUNT", cast=int, default=10)
MIN_CONNECTIONS_COUNT: int = config("MIN_CONNECTIONS_COUNT", cast=int, default=10)
HOST:str = config("HOST",cast=str,default="127.0.0.1")
PORT:int = config("PORT",cast=int,default=3306)
USER_NAME:str = config("USER_NAME",cast=str,default="root")
PASSWORD:str = config("PASSWORD",cast=str,default="root")
DB:str = config("DB",cast=str,default="cricket4u")
SECRET_KEY: Secret = config("SECRET_KEY",default="secret", cast=Secret)

print(USER_NAME)
print(PASSWORD)
print(HOST)
print(DB)




# SQLALCHEMY_DATABASE_URL = 'mysql+pymysql://admin:admin123@cricket4you.cttnapb9ysdy.us-east-1.rds.amazonaws.com/cricket4u'

SQLALCHEMY_DATABASE_URL ='mysql+pymysql://'+USER_NAME+':'+PASSWORD+'@'+HOST+'/'+DB
logger.info("Connecting to server", )



engine = create_engine(
    SQLALCHEMY_DATABASE_URL
)
logger.info("Connected")

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
db = SessionLocal()
db2=SessionLocal()

Base = declarative_base()
