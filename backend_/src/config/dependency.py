import boto3
from botocore.client import BaseClient
from starlette.config import Config
config = Config(".env")


def s3_auth() -> BaseClient:
    s3 = boto3.client(service_name='s3', aws_access_key_id=config.AWS_SERVER_PUBLIC_KEY,
                      aws_secret_access_key=config.AWS_SERVER_SECRET_KEY
                      )

    return s3