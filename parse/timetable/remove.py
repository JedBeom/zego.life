for x in ["monday", "tuesday", "wednesday", "thursday", "friday"]:
    with open(f"{x}_input.csv", "r") as inf:
        with open(f"{x}_output.csv", "w") as fixed:
            for line in inf:
                fixed.write(line)

