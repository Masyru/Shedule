import os.path
import pandas as pd


def make_result(year, month):
    ans = []
    if os.path.exists(f'./archive/{month}_{year}.xlsx'):
        ex_data = pd.read_excel('./archive/10_2019.xlsx', sheet_name=1, usecols='A:AL', skiprows=5, nrows=56)
        array = ex_data.values.tolist()
        for row in array:
            ans.append({'id': row[0], 'name': row[1], 'type': row[2], 'data': row[3:]})
    return ans
