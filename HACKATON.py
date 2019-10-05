import pandas as pd
import os
from json import dumps
from flask import Flask
from flask import jsonify, redirect, render_template
from datetime import datetime
from functions import make_result

app = Flask(__name__, template_folder='./frontend', static_folder='./frontend')
now = datetime.now()


@app.route('/', methods=["GET"])
def main_page():
    return render_template('index.html')


@app.route('/getScheduleTable', methods=['GET'])
def get_data():
    y, m = now.year, now.month
    print(y, m)
    res = {'currentYear': y, 'currentMonth': m}
    if os.path.exists(f'./archive/{m}_{y}.xlsx'):
        res["table"] = make_result(y, m)
        print(res)
        return dumps(res)
    else:
        print(2)


@app.route('/<int:month>.<int:year>', methods=['GET'])
def get_data_from_archive(month, year):
    res = [{'year': year, 'month': month}]
    if os.path.exists(f'./archive/{month}_{year}.xlsx'):
        res += make_result(year, month)
        print(res)
        return dumps(res)
    else:
        return False


@app.route('/history', methods=['GET'])
def history():
    dir = os.listdir('./archive')
    res = {}
    for filename in dir:
        filename = filename[:-5]
        date = filename.split('_')
        if date[1] in res:
            res[date[1]].append(date[0])
        else:
            res[date[1]] = [date[0]]
    print(res)
    return dumps(res)


if __name__ == '__main__':
    app.run(port=5000, host='127.0.0.1')
