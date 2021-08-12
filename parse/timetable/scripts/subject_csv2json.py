import json
import argparse

parser = argparse.ArgumentParser(description='과목 csv 파일을 json으로 변환합니다.')
parser.add_argument("--input", type=str, help="원본 파일의 경로")
parser.add_argument("--output", type=str, help="변경된 파일을 저장할 경로")

args = parser.parse_args()

subjects = []

with open(args.input, "r", encoding='UTF-8-sig') as f:
    next(f) # ignore header
    for l in f:
        lists = l.rstrip().split(",")
        subjects.append({"Subject": lists[0], "SubjectFullname": lists[1], "Teacher": lists[2], "Room": lists[3]})

with open(args.output, "w") as f:
    f.write(json.dumps(subjects, ensure_ascii=False, indent=4, sort_keys=True))

print(f"총 {len(subjects)}개의 과목을 입력했습니다.")