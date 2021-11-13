import { simonHelper } from "./modules/simon-article-helper.js";
import * as fs from "fs";

let simonArticles = await simonHelper.getArticles({
  startPage: 1,
  endPage: 92,
  relatedToDate: "",
  searchText: ["IELTS Writing Task 2", "IELTS Advice"],
  previousNumber: 2,
  nextNumber: 2,
});

let data = "";
let cellCount = 1;
simonArticles.forEach((a) => {
  if (cellCount === 3) {
    data += `<div class="col">
	<h5>${a.date}</h5>
	<h4><a href="${a.url}">${a.title}</a></h4>
	<p>${a.body}</p>
	</div>`;
    data += "</div>";
    data += `<div class="row align-items-start">`;
    cellCount = 1;
  } else {
    data += `<div class="col">
	<h5>${a.date}</h5>
	<h4><a href="${a.url}">${a.title}</a></h4>
	<p>${a.body}</p>
	</div>`;
    cellCount++;
  }
});

let header = `
	<title>Thomas & IELTS</title>
	<link rel="icon" type="image/x-icon" href="favicon.ico"/>
	<link rel="stylesheet" href="style.css">
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">`;

let body = `<div class="container">
	<div class="row align-items-start">${data}</div></div>`;

let template = `<!DOCTYPE html>
  <html><head>
  ${header}
  </head><body>
  ${body}
  </body>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
  </html>`;

fs.writeFile("./dist/index.html", template, errorHandler);

function errorHandler(err) {
  if (err) return console.log(err);
  console.log("done");
}
