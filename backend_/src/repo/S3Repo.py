import boto3
from starlette.config import Config
config = Config(".env")

class S3Repo():
    #  download from s3
    #   @param {filename} with battinb/name.png 
    #   @param {filenameWithExtension} name.png 
    #  @returns 
     
    def download_file(filename,filenameWithExtension):
        client = boto3.client('s3', aws_access_key_id=config("ACCESS_KEY") , aws_secret_access_key=config("SECRET_KEY_S3"))
        # s3=boto3.resource('s3', aws_access_key_id=config("ACCESS_KEY") , aws_secret_access_key=config("SECRET_KEY_S3"))
        # bucket=s3.Bucket(config("BUCKET_NAME"))
        # files=list(bucket.objects.all())
        # client.download_file(config("BUCKET_NAME"),'batting/image.png','./tmp/image.png')
        client.download_file(config("BUCKET_NAME"),filename,'./tmp/'+filenameWithExtension)
        return 'downloaded'
        