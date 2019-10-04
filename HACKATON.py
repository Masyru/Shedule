import pandas as pd
import os.path
from json import dumps
from flask import Flask
from flask import jsonify, redirect, render_template
from datetime import datetime
from functions import make_result

app = Flask(__name__, template_folder='./frontend', static_folder='./frontend')
now = datetime.now()


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/get_data', methods=['GET'])
def get_data():
    year, month = now.year, now.month
    res = [{'year': year, 'month': month}]
    if os.path.exists(f'./archive/{month}_{year}.xlsx'):
        res += make_result(year, month)
        print(res)
        return dumps(res)
    else:
        print(2)


@app.route('/get_data/<int:month>.<int:year>', methods=['GET'])
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
    pass


if __name__ == '__main__':
    app.run(port=8000, host='127.0.0.1')
