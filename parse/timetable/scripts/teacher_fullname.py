import argparse

parser = argparse.ArgumentParser(description='두 글자 교사 이름을 세 글자 풀 네임으로 바꿉니다.')
parser.add_argument("--input", type=str, help="원본 파일의 경로")
parser.add_argument("--output", type=str, help="변경된 파일을 저장할 경로")
parser.add_argument("--teachers", type=str, help="교사 풀 네임 텍스트 파일의 경로")

args = parser.parse_args()

ts = []
with open(args.teachers, "r") as t_file:
    for l in t_file:
        ts.append(l.rstrip())

ts = set(ts)
ts = list(ts)[1:]

print(f"총 {len(ts)}명의 선생님이 있습니다.")

with open(args.input, "r") as inf:
    with open(args.output, "w") as fixed:
        for line in inf:
            for t in ts:
                line = line.replace(t[0]+t[1], t, 10)
            fixed.write(line)

print("작업을 완료했습니다.")
