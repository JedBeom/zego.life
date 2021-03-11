import json

subjects = []

with open("3grade.txt", "r", encoding='UTF-8-sig') as f:
    for l in f:
        lists = l.rstrip().split(",")
        subjects.append({"Subject": lists[0], "Teacher": lists[1], "Room": lists[2]}) 

with open("3grade.json", "w") as f:
    f.write(json.dumps(subjects, ensure_ascii=False))
