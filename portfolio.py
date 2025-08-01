from flask import Flask, render_template, request, redirect
from pathlib import Path
import csv, os

app = Flask(__name__)

class Work:
    def __init__(self, title, images, description, link):
        self.title = title
        self.images = images
        self.images_size = len(images)
        self.description = description
        self.link = link

ba2_project_dir = Path(__file__).parent / "static/assets/images/delivery_robot"
ba2_project_photos = [f"static/assets/images/delivery_robot/{f.name}" for f in ba2_project_dir.iterdir() if f.is_file()]

ba1_project_dir = Path(__file__).parent / "static/assets/images/cochlear_implant"
ba1_project_photos = [f"static/assets/images/cochlear_implant/{f.name}" for f in ba1_project_dir.iterdir() if f.is_file()]


ba1_project = Work("Cochlear Implant", ba1_project_photos, Path("./static/assets/descriptions/cochlear_implant.txt").read_text(), '/implant_project')
ba2_project = Work("Delivery Bot", ba2_project_photos, Path("./static/assets/descriptions/delivery_robot.txt").read_text(), '/robot_project')
works = [ba1_project, ba2_project]

profile_photos_dir = Path(__file__).parent / "static/assets/images/profile_photos"
profile_photos = [f.name for f in profile_photos_dir.iterdir() if f.is_file()]

@app.errorhandler(404)
def page_not_found(error):
    return render_template("notfound.html"), 404


@app.errorhandler(500)
def page_not_found(error):
    return render_template("notfound.html"), 500




@app.route('/')
def home():
    return render_template('index.html', index = True)


@app.route('/<string:page_name>')
def html_page(page_name):
    if page_name == "projects": 
        return render_template("projects.html", works = works, works_size = len(works))
    if page_name == "about":
        return render_template("about.html", profile_photos = profile_photos, size = len(profile_photos))
    return render_template(f"{page_name}.html", name = page_name)





if __name__ == '__main__':
    app.run()
