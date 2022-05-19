# -*- coding: utf-8 -*-
"""Cricket_Detection_w_mediapipe.ipynb

Automatically generated by Colaboratory.

Original file is located at
    https://colab.research.google.com/drive/1Nppbi59pwtSRZOPo079tSHq10xnwlTEO
"""

import os
import pandas as pd
from keras.preprocessing.image import ImageDataGenerator
from sklearn.ensemble  import RandomForestClassifier as rfc ,BaggingClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import confusion_matrix
from sklearn.metrics import classification_report
from sklearn.tree  import DecisionTreeClassifier
import numpy as np
from sklearn.metrics import mean_squared_error
from sklearn.metrics import accuracy_score, confusion_matrix

from google.colab import drive
drive.mount('/content/drive')

headers=[                      
                'Nose X','Nose Y',
                'Left Eye X','Left Eye Y',
                'Right Eye X', 'Right Eye Y',
                'Right Shoulder X', 'Right Shoulder Y',
                'Left Shoulder X', 'Left shoulder Y',
                'Right Elbow X', 'Right Elbow Y',
                'Left Elbow X', 'Left Elbow Y',
                'Right Wrist X', 'Right Wrist Y',
                'Left Wrist X', 'Left Wrist Y',
                'Right Hip X', 'Right Hip Y',
                'Left Hip X','Left Hip Y',
                'Right Knee X', 'Right Knee Y',
                'Left Knee X', 'Left Knee Y',
                'Right Ankle X','Right Ankle Y',
                'Left Ankle X','Left Ankle Y'
]

# #WORKING WITH 15 coordinates, DO NOT DELETE

coverUrl = '/content/drive/MyDrive/Cricket shot model/cover.csv'
coverDrive = pd.read_csv(coverUrl,header=None )

straightUrl = '/content/drive/MyDrive/Cricket shot model/straight.csv'
straightDrive = pd.read_csv(straightUrl,header=None)

cutShotUrl = '/content/drive/MyDrive/Cricket shot model/cut.csv'
cutShot = pd.read_csv(cutShotUrl,header=None)

pullShotUrl = '/content/drive/MyDrive/Cricket shot model/pull.csv'
pullShot = pd.read_csv(pullShotUrl,header=None)

scoopShotUrl = '/content/drive/MyDrive/Cricket shot model/scoop.csv'
scoopShot = pd.read_csv(scoopShotUrl,header=None)

legShotUrl = '/content/drive/MyDrive/Cricket shot model/leg.csv'
legShot = pd.read_csv(legShotUrl,header=None)

coverDrive.shape, pullShot.shape, straightDrive.shape,scoopShot.shape,legShot.shape,cutShot.shape

coverDrive['pose']='Cover Drive'
pullShot['pose']='Pull Shot'
straightDrive['pose']='Straight Drive'
scoopShot['pose']='Scoop Shot'
legShot['pose']='Leg Shot'
cutShot['pose']='Cut Shot'

alldata = coverDrive.append(pullShot)
alldata = alldata.append(straightDrive)
alldata = alldata.append(scoopShot)
alldata = alldata.append(legShot)
alldata = alldata.append(cutShot)

alldata = alldata.reset_index(drop = True)
alldata.shape

updatedData = alldata.copy()
updatedData = updatedData.fillna(-1)

X = updatedData[[c for c in updatedData.columns if c != 'pose']]
Y = updatedData['pose']
x_train, x_test, y_train, y_test= train_test_split(X, Y, test_size= 0.20, random_state=1, stratify=Y) 

from sklearn.preprocessing import StandardScaler    
st_x= StandardScaler()    
x_train= st_x.fit_transform(x_train)    
x_test= st_x.transform(x_test)

"""**Gradient boosting algorithm**"""

from sklearn.ensemble import GradientBoostingClassifier

clf = GradientBoostingClassifier(n_estimators=96, learning_rate=1.0, max_depth=1)
clf.fit(x_train, y_train)
y_pred= clf.predict(x_test)  
print(classification_report(y_test, y_pred))

# Commented out IPython magic to ensure Python compatibility.
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
accuracyScoreG =[]
for k in range(1, 100):
    clf = GradientBoostingClassifier(n_estimators=k, learning_rate=1.0, max_depth=1)
    clf.fit(x_train, y_train)
    y_pred= clf.predict(x_test)     
    accuracyScoreG.append(accuracy_score(y_test, y_pred))

import matplotlib.pyplot as plt
# %matplotlib inline

# plot the relationship between K and testing accuracy
# plt.plot(x_axis, y_axis)
plt.plot(range(1, 100), accuracyScoreG)
plt.xlabel('Value of n_estimators for Random Forest Classifier')
plt.ylabel('Testing Accuracy')

maxScore=0
index=0
for k in range(len(accuracyScoreG)):
  if accuracyScoreG[k] > maxScore:
    maxScore=accuracyScoreG[k]
    index=k+1

print("Score for Gradient",maxScore,"Number of tress for Gradient",index)

"""**Random Forest Algorithm**"""

from sklearn.ensemble import RandomForestClassifier  
classifier= RandomForestClassifier(n_estimators= 96, criterion="entropy",class_weight="balanced")  
classifier.fit(x_train, y_train)  
y_pred= classifier.predict(x_test)  

print(classification_report(y_test, y_pred))

# Commented out IPython magic to ensure Python compatibility.
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
accuracyScore =[]
for k in range(1, 100):
    rfc = RandomForestClassifier(n_estimators=k,criterion="entropy",class_weight="balanced")
    rfc.fit(x_train, y_train)
    y_pred = rfc.predict(x_test)
    accuracyScore.append(accuracy_score(y_test, y_pred))

import matplotlib.pyplot as plt
# %matplotlib inline

# plot the relationship between K and testing accuracy
# plt.plot(x_axis, y_axis)
plt.plot(range(1, 100), accuracyScore)
plt.xlabel('Value of n_estimators for Random Forest Classifier')
plt.ylabel('Testing Accuracy')

print(accuracyScore)

maxScore=0
index=0
for k in range(len(accuracyScore)):
  if accuracyScore[k] > maxScore:
    maxScore=accuracyScore[k]
    index=k+1

print("Score",maxScore,"Number of tress",index)

# Commented out IPython magic to ensure Python compatibility.
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
accuracyScoreG =[]
accuracyScore =[]
for k in range(1, 100):
    rfc = RandomForestClassifier(n_estimators=k,criterion="entropy",class_weight="balanced")
    rfc.fit(x_train, y_train)
    y_pred = rfc.predict(x_test)
    accuracyScore.append(accuracy_score(y_test, y_pred))

    clf = GradientBoostingClassifier(n_estimators=k, learning_rate=1.0, max_depth=1)
    clf.fit(x_train, y_train)
    y_pred= clf.predict(x_test)     
    accuracyScoreG.append(accuracy_score(y_test, y_pred))

import matplotlib.pyplot as plt
# %matplotlib inline

# plot the relationship between K and testing accuracy
# plt.plot(x_axis, y_axis)
plt.plot(range(1, 100), accuracyScoreG)
plt.plot(range(1, 100), accuracyScore)
plt.xlabel('Value of n_estimators for Classifiers')
plt.ylabel('Testing Accuracy')