from src.models.schemas.battingSchema import GetBattingInfo
from src.repo.BattingRepository import BattingRepository
from src.repo.S3Repo import S3Repo
from typing import List
from fastapi import APIRouter,Depends,HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from src.models.batting import Batting
from src.config.database import db,SessionLocal
from starlette.responses import JSONResponse
from src.models.schemas import battingSchema
from http import HTTPStatus
from src.models.batting import Batting
import os.path
import numpy as np
import pandas as pd
import tensorflow as tf

app = APIRouter()
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get('/get-shot') #prediction on data
def predict(filename):
    try:
        # check if exist and delete
        filenameWithExtension=filename.split("/")
        filenameWithExtension=filenameWithExtension[1]

        # download the video from s3
        S3Repo.download_file(filename,filenameWithExtension)
        BattingRepository.humanPose(filename,filenameWithExtension);
        predict=pd.read_csv('./src/app/csvs/userBattingCoordinates.csv',nrows=14, header=None, skiprows=1)
        predict = predict.iloc[: , 1:]
        predicted_Numpy=predict.to_numpy()
        classify_this = predicted_Numpy
        predicted_Numpy=classify_this.reshape((1,classify_this.shape[0], classify_this.shape[1]))
        loaded_model = tf.keras.models.load_model('./src/trained_models/lstmModel.h5') #loading the saved model
        predictions = loaded_model.predict(predicted_Numpy,batch_size=1,verbose=0) #making predictions
        shotType = int(np.argmax(predictions)) 
        accuracyPercentage = max(predictions.tolist()[0]) 
        accuracyPercentage=accuracyPercentage*100
        accuracyPercentage=format(accuracyPercentage,".2f")
        if shotType==0: 
            t_shotType = 'Cover Drive'
        elif shotType==1:
            t_shotType = 'Pull Shot'
        elif shotType==2:
            t_shotType='Straight Drive'
    
        # os.remove('./src/app/csvs/userBattingCoordinates.csv')
        os.remove('./tmp/'+filenameWithExtension)
        return { 
            "predicted": t_shotType,
            "accuracy": accuracyPercentage
        }
    except IntegrityError:
        # os.remove('./src/app/csvs/userBattingCoordinates.csv')
        os.remove('./tmp/'+filenameWithExtension)
        return JSONResponse(status_code=HTTPStatus.BAD_REQUEST, content={'Something went wrong : Please try again'}) 


# saving the type of shot after predicition
@app.post("/save-user-shotDetails", response_model=battingSchema.BattingSaveInfo)
def save_batsman_shot_info(battingObj: battingSchema.BattingSaveInfo, db: Session = Depends(get_db)):
    db_save_shot = Batting(user_id=battingObj.user_id,shotType=battingObj.shotType, accuracy=battingObj.accuracy)
    db.add(db_save_shot)
    db.commit()
    db.refresh(db_save_shot)
    return db_save_shot


@app.get("/users/{user_id}/batting-stats", response_model=List[battingSchema.GetBattingInfo])
def read_user(user_id: int,shotType:str):
    shotDetails = BattingRepository.get_user_batting_stats(user_id=user_id,shotType=shotType)
    if shotDetails is None:
        raise HTTPException(status_code=404, detail="No Data")
    return shotDetails

# prediction for stance
@app.get("/stance")
def read_stance(fileLocation):
    print(fileLocation)
    filename=fileLocation.split("/")
    filename=filename[1]
    stanceInfo=BattingRepository.getStance(fileLocation,filename)
    return stanceInfo

# Stats of the user
@app.get("/latest-batting-stats/{user_id}",response_model=List[battingSchema.GetBattingInfo])
def read_latest_stats(user_id: int):
    stats = BattingRepository.get_latest_batting_stats(user_id=user_id)
    return stats     

# dummy checkup for s3
@app.get("/s3")
def read_s3():
    stats = S3Repo.download_file()
    return stats  

# classify the cricket shot with image
@app.get("/shot-type/image")
def get_type_of_shot(fileLocation):
    print(fileLocation)
    filename=fileLocation.split("/")
    filename=filename[1]
    imageClassify=BattingRepository.classifyShotUsingImage(fileLocation,filename)
    
    return imageClassify   

# average shots percentage for pie chart
@app.get("/average-all-shots/{user_id}")
def get_average_all_shots(user_id: int):
    stats = BattingRepository.getAverageAllShots(user_id=user_id)
    return stats  