import os.path
import pandas as pd


# костыль!!! месяц: первый день месяца в 2019
days = {1: 2, 2: 5, 3: 5, 4: 1, 5: 3, 6: 6, 7: 1, 8: 4, 9: 7, 10: 2, 11: 5, 12: 7}


def make_result(year, month):
    ans = []
    if os.path.exists(f'./archive/{month}_{year}.xlsx'):
        ex_data = pd.read_excel('./archive/10_2019.xlsx', sheet_name=1, usecols='A:AK', skiprows=4, nrows=56)
        array = ex_data.values.tolist()
        first_day = days[month]
        for row in array[1:]:
            ans.append({'id': row[0], 'name': row[1], 'type': row[2], 'data': row[3:-4], 'sum_hours': row[-3], 'delta': row[-1]})
    return ans, first_day
