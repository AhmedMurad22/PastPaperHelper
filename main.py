from flask import Flask, request, render_template
from extract_data import mainFunction

app = Flask(__name__)


@app.route('/')
def main():
    return render_template('index.html')


@app.route('/submit', methods=['POST'])
def submit_form():
    year = request.form['year']
    code = request.form['code']
    series = request.form['series']
    variant = request.form['variant']
    coreORextended = request.form['coreORextended']

    qpurl, msdata, pd_subject, pd_year, pd_code, pd_series, pd_variant, pd_coreorextended  = mainFunction([year, code, series, variant, coreORextended])
    return render_template("paper.html", qpurl=qpurl, ms_data=msdata, pd_subject=pd_subject, pd_year=pd_year, pd_code=pd_code, pd_series=pd_series, pd_variant=pd_variant, pd_coreorextended=pd_coreorextended)

if __name__ == '__main__':
    app.run(debug=True)
