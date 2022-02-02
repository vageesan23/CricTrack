import glob
import os
import shutil

file_list = glob.glob(os.path.join(os.getcwd(), "/home/narthanana/SLIIT/2021-172/backend_/bowling/runs/detect/exp/labels", "*.txt"))

text_file_numbers = []

for file_path in file_list:
    text_file_numbers.append(file_path.split("/")[len(file_path.split("/")) - 1].split('_')[1].split('.')[0])

text_file_numbers.sort()

ball_coordinates = []

for i in range(len(text_file_numbers)):
    f = open("runs/detect/exp/labels/cooray2_" +text_file_numbers[i] +".txt", "r")
    coordinate_rows = f.readlines()
    for single_coordinate_row in coordinate_rows:
        if(single_coordinate_row.split(" ")[0] == '0'):
            ball_coordinates.append(single_coordinate_row.split(" ")[1] + " " + single_coordinate_row.split(" ")[2])

ball_pitching_coordinate = ""
batsman_coordinates = ""

# print only y coordinates
# for i in ball_coordinates:
#     print(i.split(" ")[1])


for i in range(len(ball_coordinates)):
    y_coordinate = ball_coordinates[i].split(" ")[1]
    if(i != len(ball_coordinates) -1):
        y_coordinate_next = ball_coordinates[i+1].split(" ")[1]
    if(y_coordinate_next < y_coordinate):
        ball_pitching_coordinate = ball_coordinates[i]
        break

print("Ball pitching X coordinate: " + ball_pitching_coordinate.split(" ")[0])
print("Ball pitching Y coordinate: " + ball_pitching_coordinate.split(" ")[1])

file_number_containing_pitching_coordinates = ""

for i in range(len(text_file_numbers)):
    f = open("runs/detect/exp/labels/cooray2_" +text_file_numbers[i] +".txt", "r")
    coordinate_rows = f.readlines()
    for coordinate_row in coordinate_rows:
        object_id = coordinate_row.split(" ")[0]
        if(object_id == "0"):
            if(ball_pitching_coordinate.split(" ")[0] == coordinate_row.split(" ")[1]):
                file_number_containing_pitching_coordinates = text_file_numbers[i]



# ball pitch agura framela batsman da coordinate
file_containing_ball_pitching_coordinates = open("runs/detect/exp/labels/cooray2_" +file_number_containing_pitching_coordinates +".txt", "r")
lines = file_containing_ball_pitching_coordinates.readlines()
for i in lines:
    if(i.split(" ")[0] == "1"):
        batsman_coordinates = i.split(" ")[1] + " " + i.split(" ")[2]

# ball pitch aana frame la irunthu adutha vaara 3 frames la iruka batsman da coordinate 
if batsman_coordinates == "":
    print("ipa inga varathu")
    for i in range(3):
        next_file_number = int(file_number_containing_pitching_coordinates) + 1
        file_number_containing_pitching_coordinates = str(next_file_number)
        try:
            f = open("runs/detect/exp/labels/cooray2_" + str(next_file_number) +".txt", "r")
        except FileNotFoundError:
            print("File not found")

        lines = f.readlines()
        for i in lines:
            if(i.split(" ")[0] == "1"):
                batsman_coordinates = i.split(" ")[1] + " " + i.split(" ")[2]

# ball pich agirathuku muthal irukra 3 frames kula irukra batsman da coordinate 
if batsman_coordinates == "":
    print("ipa inga varathu")
    for i in range(3):
        next_file_number = int(file_number_containing_pitching_coordinates) -1
        file_number_containing_pitching_coordinates = str(next_file_number)
        try:
            f = open("runs/detect/exp/labels/cooray2_" + str(next_file_number) +".txt", "r")
        except FileNotFoundError:
            print("File not found")

        lines = f.readlines()
        for i in lines:
            if(i.split(" ")[0] == "1"):
                batsman_coordinates = i.split(" ")[1] + " " + i.split(" ")[2]

print("Batsman's X coordinate: " + batsman_coordinates.split(" ")[0])
print("Batsman's Y coordinate: " + batsman_coordinates.split(" ")[1])

shutil.rmtree('runs/detect/exp')