from sqlalchemy import  and_,between
from src.repo.S3Repo import S3Repo
import cv2
import mediapipe as mp
import os.path
from csv import writer
import pandas as pd
from http import HTTPStatus
from src.models.batting import Batting
from src.config.database import db2
from starlette.responses import JSONResponse, Response
from sqlalchemy.exc import IntegrityError
import pickle
from sqlalchemy.sql import func

class BattingRepository():
  
  def get_user_batting_stats(user_id,shotType):
        return db2.query(Batting).filter(and_(Batting.user_id == user_id),(Batting.shotType==shotType)).all()
       
  def get_latest_batting_stats(user_id):
    try:
          query= db2.query(Batting).filter((Batting.user_id == user_id)).all()   
          return query
    except IntegrityError:
        db2.rollback() 
        return JSONResponse(status_code=HTTPStatus.BAD_REQUEST, content={'error': 'Something went wrong while fetching data'})

  def getAverageAllShots(user_id):
    try:
          query=db2.query(Batting.shotType,func.avg(Batting.accuracy).label('average')).filter((Batting.user_id == user_id)).group_by(Batting.shotType)
          return query
    except IntegrityError:
        db2.rollback() 
        return JSONResponse(status_code=HTTPStatus.BAD_REQUEST, content={'error': 'Something went wrong while fetching data'})

  def classifyShotUsingImage(fileLocation,filename):
        try:
              S3Repo.download_file(fileLocation,filename)
              mp_drawing = mp.solutions.drawing_utils 
              image="./tmp/"+filename;
              input_frame = cv2.imread(image)
              input_frame = cv2.cvtColor(input_frame, cv2.COLOR_BGR2RGB)
              mp_pose = mp.solutions.pose
              
              with mp_pose.Pose(static_image_mode=True, min_detection_confidence=0.3, model_complexity=2) as pose_tracker:
                    results = pose_tracker.process(image=input_frame)
                    pose_landmarks = results.pose_landmarks
                    if pose_landmarks is not None:
                          assert len(pose_landmarks.landmark) == 33, 'Unexpected number of predicted pose landmarks: {}'.format(len(pose_landmarks.landmark))
                          coordinates= [results.pose_landmarks.landmark[0].x,results.pose_landmarks.landmark[0].y,results.pose_landmarks.landmark[2].x,results.pose_landmarks.landmark[2].y,
                                    results.pose_landmarks.landmark[5].x, results.pose_landmarks.landmark[5].y,
                                    results.pose_landmarks.landmark[12].x, results.pose_landmarks.landmark[12].y,
                                    results.pose_landmarks.landmark[11].x,results.pose_landmarks.landmark[11].y,
                                    results.pose_landmarks.landmark[14].x, results.pose_landmarks.landmark[14].y,
                                    results.pose_landmarks.landmark[13].x, results.pose_landmarks.landmark[13].y,
                                    results.pose_landmarks.landmark[16].x, results.pose_landmarks.landmark[16].y,
                                    results.pose_landmarks.landmark[15].x, results.pose_landmarks.landmark[15].y,
                                    results.pose_landmarks.landmark[24].x, results.pose_landmarks.landmark[24].y,
                                    results.pose_landmarks.landmark[23].x, results.pose_landmarks.landmark[23].y,
                                    results.pose_landmarks.landmark[26].x, results.pose_landmarks.landmark[26].y,
                                    results.pose_landmarks.landmark[25].x, results.pose_landmarks.landmark[25].y,
                                    results.pose_landmarks.landmark[28].x, results.pose_landmarks.landmark[28].y,
                                    results.pose_landmarks.landmark[27].x, results.pose_landmarks.landmark[27].y]
                    else:
                          os.remove("./tmp/"+filename)
                          return {"notFound":"Sorry we could not analyse,Please try again with different image"}

              model = pickle.load(open("./src/trained_models/cricketShotImageClassify.pickle","rb"))
              
              prediction=model.predict([coordinates])
              prediction=prediction[0]

              outputs = model.predict_proba([coordinates])
              percentage=outputs.tolist()[0]
              percentage=percentage[0]*100
              accuracyPercentage=format(percentage,".2f")
              os.remove("./tmp/"+filename)
              return {"predicted": prediction,"accuracy":accuracyPercentage}
              
        except IntegrityError:
              os.remove("./tmp/"+filename)
              return JSONResponse(status_code=HTTPStatus.BAD_REQUEST, content={'error': 'Something went wrong while fetching data'})


  def getStance(fileLocation,filename):
        S3Repo.download_file(fileLocation,filename)
        images=cv2.imread("./tmp/"+filename);
        mp_pose = mp.solutions.pose
        mp_drawing = mp.solutions.drawing_utils 
        drawing_spec = mp_drawing.DrawingSpec(thickness=2, circle_radius=1)
        with mp_pose.Pose(static_image_mode=True, min_detection_confidence=0.5) as pose:
              results = pose.process(cv2.cvtColor(images, cv2.COLOR_BGR2RGB))
              image_hight, image_width, _ = images.shape
              if not results.pose_landmarks:
                    print(
                    f' coordinates: (\n'
                    f'Nose '
                    f'{results.pose_landmarks.landmark[0].x }, '
                    f'{results.pose_landmarks.landmark[0].y }) \n'
                    f'left eye \n'
                    f'{results.pose_landmarks.landmark[2].x }, '
                    f'{results.pose_landmarks.landmark[2].y })\n'
                    f'right eye \n'
                    f'{results.pose_landmarks.landmark[5].x }, '
                    f'{results.pose_landmarks.landmark[5].y }) \n'
                    f'right shoulder \n'
                    f'{results.pose_landmarks.landmark[12].x }, '
                    f'{results.pose_landmarks.landmark[12].y })\n'
                    f'left shoulder \n'
                    f'{results.pose_landmarks.landmark[11].x }, '
                    f'{results.pose_landmarks.landmark[11].y })\n'
                    f'right elbow \n'
                    f'{results.pose_landmarks.landmark[14].x }, '
                    f'{results.pose_landmarks.landmark[14].y })\n'
                    f'left elbow \n'
                    f'{results.pose_landmarks.landmark[13].x }, '
                    f'{results.pose_landmarks.landmark[13].y })\n'
                    f'left wrist \n'
                    f'{results.pose_landmarks.landmark[15].x }, '
                    f'{results.pose_landmarks.landmark[15].y })\n'
                    f'right wrist \n'
                    f'{results.pose_landmarks.landmark[16].x }, '
                    f'{results.pose_landmarks.landmark[16].y })\n'
                    f'right hip \n'
                    f'{results.pose_landmarks.landmark[24].x }, '
                    f'{results.pose_landmarks.landmark[24].y })\n'
                    f'left hip \n'
                    f'{results.pose_landmarks.landmark[23].x }, '
                    f'{results.pose_landmarks.landmark[23].y })\n'
                    f'left knee \n'
                    f'{results.pose_landmarks.landmark[25].x }, '
                    f'{results.pose_landmarks.landmark[25].y })\n'
                    f'right knee \n'
                    f'{results.pose_landmarks.landmark[26].x }, '
                    f'{results.pose_landmarks.landmark[26].y })\n'
                    f'left ankle adikaal \n'
                    f'{results.pose_landmarks.landmark[27].x }, '
                    f'{results.pose_landmarks.landmark[27].y })\n'
                    f'right ankle adikaal \n'
                    f'{results.pose_landmarks.landmark[28].x }, '
                    f'{results.pose_landmarks.landmark[28].y })\n')
              
              annotated_image = images.copy()
              mp_drawing.draw_landmarks(
              image=annotated_image,
              landmark_list=results.pose_landmarks,
              connections=mp_pose.POSE_CONNECTIONS,
              landmark_drawing_spec=drawing_spec,
              connection_drawing_spec=drawing_spec)
    # cv2.imshow(annotated_image)
        dataset= {'Nose X': [results.pose_landmarks.landmark[0].x], 'Nose Y': [results.pose_landmarks.landmark[0].y],
          'Left Eye X': [results.pose_landmarks.landmark[2].x], 'Left Eye Y': [results.pose_landmarks.landmark[2].y],
           'Right Eye X': [results.pose_landmarks.landmark[5].x], 'Right Eye Y': [results.pose_landmarks.landmark[5].y],
           'Right Shoulder X': [results.pose_landmarks.landmark[12].x], 'Right Shoulder Y': [results.pose_landmarks.landmark[12].y],
           'Left Shoulder X': [results.pose_landmarks.landmark[11].x], 'Left shoulder Y': [results.pose_landmarks.landmark[11].y],
             'Right Elbow X': [results.pose_landmarks.landmark[14].x], 'Right Elbow Y': [results.pose_landmarks.landmark[14].y],
           'Left Elbow X': [results.pose_landmarks.landmark[13].x], 'Left Elbow Y': [results.pose_landmarks.landmark[13].y],
             'Right Wrist X': [results.pose_landmarks.landmark[16].x], 'Right Wrist Y': [results.pose_landmarks.landmark[16].y],
           'Left Wrist X': [results.pose_landmarks.landmark[15].x], 'Left Wrist Y': [results.pose_landmarks.landmark[15].y],
              'Right Hip X': [results.pose_landmarks.landmark[24].x], 'Right Hip Y': [results.pose_landmarks.landmark[24].y],
           'Left Hip X': [results.pose_landmarks.landmark[23].x], 'Left Hip Y': [results.pose_landmarks.landmark[23].y],
                   'Right Knee X': [results.pose_landmarks.landmark[26].x], 'Right Knee Y': [results.pose_landmarks.landmark[26].y],
           'Left Knee X': [results.pose_landmarks.landmark[25].x], 'Left Knee Y': [results.pose_landmarks.landmark[25].y],
            'Right Ankle X': [results.pose_landmarks.landmark[28].x], 'Right Ankle Y': [results.pose_landmarks.landmark[28].y],
           'Left Ankle X': [results.pose_landmarks.landmark[27].x], 'Left Ankle Y': [results.pose_landmarks.landmark[27].y]      
          }
        original=[0.3276946246623993,
        0.19058310985565186,
        0.35846441984176636,
        0.1626567840576172,
        0.32204949855804443,
        0.1639719307422638,
        0.2793685495853424,
        0.2567468583583832,
        0.5560616254806519,
        0.24419474601745605,
        0.28843986988067627,
        0.41575679183006287,
        0.6678810715675354,
        0.40916910767555237,
        0.3519378900527954,
        0.5421864986419678,
        0.5072847604751587,
        0.5196876525878906,
        0.4252376854419708,
        0.4605649709701538,
        0.5980042815208435,
        0.43935608863830566,
        0.25793886184692383,
        0.6366090178489685,
        0.6933274269104004,
        0.6026175022125244,
        0.22457009553909302,
        0.8832491040229797,
        0.8241174817085266,
        0.8566015362739563]
        duplicate =[results.pose_landmarks.landmark[0].x,results.pose_landmarks.landmark[0].y,results.pose_landmarks.landmark[2].x,results.pose_landmarks.landmark[2].y,
               results.pose_landmarks.landmark[5].x,results.pose_landmarks.landmark[5].y,results.pose_landmarks.landmark[12].x,results.pose_landmarks.landmark[12].y,
               results.pose_landmarks.landmark[11].x,results.pose_landmarks.landmark[11].y,results.pose_landmarks.landmark[14].x,results.pose_landmarks.landmark[14].y,
               results.pose_landmarks.landmark[13].x,results.pose_landmarks.landmark[13].y,results.pose_landmarks.landmark[16].x,results.pose_landmarks.landmark[16].y,
               results.pose_landmarks.landmark[15].x,results.pose_landmarks.landmark[15].y,results.pose_landmarks.landmark[24].x,results.pose_landmarks.landmark[24].y,
               results.pose_landmarks.landmark[23].x,results.pose_landmarks.landmark[23].y,results.pose_landmarks.landmark[26].x,results.pose_landmarks.landmark[26].y,
               results.pose_landmarks.landmark[25].x,results.pose_landmarks.landmark[25].y,results.pose_landmarks.landmark[28].x,results.pose_landmarks.landmark[28].y,
               results.pose_landmarks.landmark[27].x,results.pose_landmarks.landmark[27].y
               ]
             

        percentage=0;
        for i in range(len(original)):
              if duplicate[i]> original[i]:
                    newduplicate=duplicate[i]-original[i]
                    duplicate[i]=original[i]-newduplicate
              total=(duplicate[i]/original[i])*100
              percentage=percentage+total
        print("similarity :")    
        print(percentage/len(original))
        similarity=percentage/len(original)
        os.remove("./tmp/"+filename)
        return {    
            similarity
             } 

  
  def humanPose(filename,filenameWithExtension):
        mpDraw = mp.solutions.drawing_utils
        mpPose = mp.solutions.pose
        pose = mpPose.Pose()
        cap = cv2.VideoCapture('./tmp/'+filenameWithExtension);
        i = 0
        pTime = 0
        while True:
            success, img = cap.read()
            imgRGB = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
            results = pose.process(imgRGB)
            lmList = []
            if results.pose_landmarks:
                mpDraw.draw_landmarks(img, results.pose_landmarks, mpPose.POSE_CONNECTIONS)
                for id, lm in enumerate(results.pose_landmarks.landmark):
                    h, w, c = img.shape
                    cx, cy = int(lm.x * w), int(lm.y * h)
                    lmList.append([id, cx, cy])
                    if (len(lmList) > 11):
                        datasetWithHeader = {'timestamp': i,
                                                'Nose X': [results.pose_landmarks.landmark[0].x],
                                                'Nose Y': [results.pose_landmarks.landmark[0].y],
                                                'Left Eye X': [results.pose_landmarks.landmark[2].x],
                                                'Left Eye Y': [results.pose_landmarks.landmark[2].y],
                                                'Right Eye X': [results.pose_landmarks.landmark[5].x],
                                                'Right Eye Y': [results.pose_landmarks.landmark[5].y],
                                                'Right Shoulder X': [results.pose_landmarks.landmark[12].x],
                                                'Right Shoulder Y': [results.pose_landmarks.landmark[12].y],
                                                'Left Shoulder X': [results.pose_landmarks.landmark[11].x],
                                                'Left shoulder Y': [results.pose_landmarks.landmark[11].y],
                                                'Right Elbow X': [results.pose_landmarks.landmark[14].x],
                                                'Right Elbow Y': [results.pose_landmarks.landmark[14].y],
                                                'Left Elbow X': [results.pose_landmarks.landmark[13].x],
                                                'Left Elbow Y': [results.pose_landmarks.landmark[13].y],
                                                'Right Wrist X': [results.pose_landmarks.landmark[16].x],
                                                'Right Wrist Y': [results.pose_landmarks.landmark[16].y],
                                                'Left Wrist X': [results.pose_landmarks.landmark[15].x],
                                                'Left Wrist Y': [results.pose_landmarks.landmark[15].y],
                                                'Right Hip X': [results.pose_landmarks.landmark[24].x],
                                                'Right Hip Y': [results.pose_landmarks.landmark[24].y],
                                                'Left Hip X': [results.pose_landmarks.landmark[23].x],
                                                'Left Hip Y': [results.pose_landmarks.landmark[23].y],
                                                'Right Knee X': [results.pose_landmarks.landmark[26].x],
                                                'Right Knee Y': [results.pose_landmarks.landmark[26].y],
                                                'Left Knee X': [results.pose_landmarks.landmark[25].x],
                                                'Left Knee Y': [results.pose_landmarks.landmark[25].y],
                                                'Right Ankle X': [results.pose_landmarks.landmark[28].x],
                                                'Right Ankle Y': [results.pose_landmarks.landmark[28].y],
                                                'Left Ankle X': [results.pose_landmarks.landmark[27].x],
                                                'Left Ankle Y': [results.pose_landmarks.landmark[27].y]
                                                }
                        i = i + 1
                        dfwithHeader = pd.DataFrame(datasetWithHeader)
                        if os.path.isfile('./src/app/csvs/userBattingCoordinates.csv'):
                            if (i % 100 == 1):
                                with open('./src/app/csvs/userBattingCoordinates.csv', 'a+', newline='') as write_obj:
                                    csv_writer = writer(write_obj)
                                    csv_writer.writerow([round(i / 1000, 2),
                                                            results.pose_landmarks.landmark[0].x,
                                                            results.pose_landmarks.landmark[0].y,
                                                            results.pose_landmarks.landmark[2].x,
                                                            results.pose_landmarks.landmark[2].y,
                                                            results.pose_landmarks.landmark[5].x,
                                                            results.pose_landmarks.landmark[5].y,
                                                            results.pose_landmarks.landmark[12].x,
                                                            results.pose_landmarks.landmark[12].y,
                                                            results.pose_landmarks.landmark[11].x,
                                                            results.pose_landmarks.landmark[11].y,
                                                            results.pose_landmarks.landmark[14].x,
                                                            results.pose_landmarks.landmark[14].y,
                                                            results.pose_landmarks.landmark[13].x,
                                                            results.pose_landmarks.landmark[13].y,
                                                            results.pose_landmarks.landmark[16].x,
                                                            results.pose_landmarks.landmark[16].y,
                                                            results.pose_landmarks.landmark[15].x,
                                                            results.pose_landmarks.landmark[15].y,
                                                            results.pose_landmarks.landmark[24].x,
                                                            results.pose_landmarks.landmark[24].y,
                                                            results.pose_landmarks.landmark[23].x,
                                                            results.pose_landmarks.landmark[23].y,
                                                            results.pose_landmarks.landmark[26].x,
                                                            results.pose_landmarks.landmark[26].y,
                                                            results.pose_landmarks.landmark[25].x,
                                                            results.pose_landmarks.landmark[25].y,
                                                            results.pose_landmarks.landmark[28].x,
                                                            results.pose_landmarks.landmark[28].y,
                                                            results.pose_landmarks.landmark[27].x,
                                                            results.pose_landmarks.landmark[27].y
                                                            ])



                        else:
                            dfwithHeader.to_csv('./src/app/csvs/userBattingCoordinates.csv', index=False)
            cv2.destroyAllWindows()
            return {"success"} 
