import logging
import os
import requests

from flask import Flask

app = Flask(__name__)
logger = logging.getLogger('main')

@app.route("/health")
def health():
    return "OK", 200

@app.route("/")
def hello_world():
    greeting=os.environ.get('GREETING', None)
    if greeting:
        return "Hello {}!".format(greeting), 200
    else:
        return "GREETING not defined", 200

# This endpoints is used to test that telepresence's intercepts on a local
# machine can still contact other services using service short-names
@app.route("/svc")
def svc():
    res = requests.get('http://hello-svc:8080')
    return "svc -> {}".format(res.text), 200


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=os.environ.get('FLASK_DEBUG_MODE', 'False') == 'True')