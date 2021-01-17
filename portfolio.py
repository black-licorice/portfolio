from flask import Flask, render_template, request, redirect
import csv, os
app = Flask(__name__)


@app.route('/')
def home():
    return render_template('index.html')


def send_email(data):
    email = data['email']
    subject = data['subject']
    message = data['message']
    import smtplib
    gmail_address = os.getenv('EMAIL')
    gmail_password = os.getenv('EMAIL_PASSWORD')
    mailto = os.getenv('TO_EMAIL')
    subject = f'{email} has contacted you, letsssssssss gooooooooo: {subject}'
    msg = message
    message = f"Subject: {subject}\n\n{msg}".encode('utf-8')
    mail_server = smtplib.SMTP('smtp.gmail.com', 587)
    mail_server.starttls()
    mail_server.login(gmail_address, gmail_password)
    mail_server.sendmail(gmail_address, mailto, message)
    mail_server.quit()


@app.route('/<string:page_name>')
def html_page(page_name):
    return render_template(f"{page_name}.html")


@app.route('/submit_form', methods=['POST', 'GET'])
def contact_me():
    if request.method == 'POST':
        data = request.form.to_dict()
        send_email(data)
        return redirect('/submitted')
    return 'Something went wrong'


@app.route('/museumOfCandy')
def museum_of_candy():
    return render_template('museumOfCandy.html')


@app.route('/weatherNow')
def weather_now():
    KEY = os.getenv('KEY')
    return render_template('weather.html', KEY=KEY)


if __name__ == '__main__':
    app.run()
