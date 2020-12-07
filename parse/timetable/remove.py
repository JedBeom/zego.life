ts = []
with open("teachers.txt", "r") as t_file:
    for l in t_file:
        ts.append(l.rstrip())

print(ts)

for x in ["monday", "tuesday", "wednesday", "thursday", "friday"]:
    with open(f"{x}_input.csv", "r") as inf:
        with open(f"{x}_output.csv", "w") as fixed:
            for line in inf:
                for t in ts:
                    line = line.replace(t[0]+t[1], t, 3)
                fixed.write(line)

