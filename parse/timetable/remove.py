ts = []
with open("teachers.txt", "r") as t_file:
    for l in t_file:
        ts.append(l.rstrip())

for x in ["monday", "tuesday", "wednesday", "thursday", "friday"]:
    with open(f"{x}_input.csv", "r") as inf:
        with open(f"{x}_output.csv", "w") as fixed:
            for line in inf:
                for t in ts:
                        line.replace(t[:2], t, 1)
                        fixed.write(line)

