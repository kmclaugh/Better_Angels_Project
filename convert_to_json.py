#!/usr/bin/env python
import csv
import json

csvfile = open('worst_atrocities.csv', 'r')
jsonfile = open('worst_atrocities.json', 'w')

fieldnames = ("Cause","Year","Death_Total","Relative","Century_String")
reader = csv.DictReader(csvfile, fieldnames, quoting=csv.QUOTE_NONNUMERIC)
for row in reader:
    json.dump(row, jsonfile)
    jsonfile.write('\n')
