#!/usr/bin/env python
import csv
import json
import pandas

csvfile = open('2-2_Percentage_of_Deaths_in_Warfare_in_Nonstate_and_State_Societies/data.csv', 'r')
jsonfile = open('2-2_Percentage_of_Deaths_in_Warfare_in_Nonstate_and_State_Societies/data.json', 'w')

#fieldnames = ("Cause","Year","Death_Total","Relative","Century_String")
dataframe = pandas.read_csv('2-2_Percentage_of_Deaths_in_Warfare_in_Nonstate_and_State_Societies/data.csv')
dataframe.to_json('2-2_Percentage_of_Deaths_in_Warfare_in_Nonstate_and_State_Societies/data.json', orient="records")
