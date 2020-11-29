from flask import Flask, render_template, url_for, request, redirect
import csv
app = Flask(__name__)
print(__name__)


@app.route('/')
def home():
    return render_template('index.html')


def write_to_csv(data):
    with open('database.csv', 'a') as database:
        email = data['email']
        subject = data['subject']
        message = data['message']
        csv_writer = csv.writer(database, delimiter=',', quoting=csv.QUOTE_MINIMAL, lineterminator='\n')
        csv_writer.writerow([email, subject, message])


@app.route('/<string:page_name>')
def html_page(page_name):
    return render_template(f"{page_name}.html")


@app.route('/submit_form', methods=['POST', 'GET'])
def contact_me():
    if request.method == 'POST':
        data = request.form.to_dict()
        write_to_csv(data)
        return redirect('/submitted')
    return 'Something went wrong'


@app.route('/museumOfCandy')
def museum_of_candy():
    return render_template('museumOfCandy.html')
