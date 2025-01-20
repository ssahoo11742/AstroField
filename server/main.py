import csv
import json

datas = ["phas", "asteroids", "comets"]

for data in datas:
    with open(f'dataIN/{data}.csv') as f:
        reader = csv.DictReader(f)
        rows = list(reader)

    with open(f'dataOUT/{data}.json', 'w') as f:
        json.dump(rows, f)