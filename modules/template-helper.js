import * as fs from "fs";

export function generate(page, configs) {
  let data = "";
  let cellCount = 1;
  page.articles.forEach((a) => {
    data += `<div class="col">
	<h5>${a.date}</h5>
	<h4><a href="${a.url}">${a.title}</a></h4>
	<p>${a.body}</p>
	</div>`;

    if (cellCount === 3) {
      data += "</div>";
      data += `<div class="row align-items-start">`;
      cellCount = 1;
    } else {
      cellCount++;
    }
  });

  let navItems = "";
  configs.pages.forEach((pageConfig) => {
    if (page.fileName === pageConfig.pageName)
      navItems += `
		<li class="nav-item active">
			<a class="nav-link" href="${pageConfig.fileName}">${pageConfig.pageName} <span class="sr-only">(current)</span></a>
		</li>`;
    else
      navItems += `
		<li class="nav-item">
			<a class="nav-link" href="href="${pageConfig.fileName}">${pageConfig.pageName}</a>
		</li>`;
  });

  let header = `
	<title>${page.pageName}</title>
	<link rel="icon" type="image/x-icon" href="./assets/favicon.ico"/>
	<link rel="stylesheet" href="./assets/style.css">
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">`;

  let body = `<div class="container">
	<div class="row align-items-start">${data}</div></div>`;

  let template = `<!DOCTYPE html>
	<html><head>
		${header}
		</head><body>
			<nav class="navbar navbar-expand-lg navbar-light bg-light">
				<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
					<span class="navbar-toggler-icon"></span>
				</button>
				<a class="navbar-brand" href="#"><img src="./assets/favicon-32x32.png" alt="Thomas & IELTS"></a>

				<div class="collapse navbar-collapse" id="navbarTogglerDemo03">
					<ul class="navbar-nav mr-auto mt-2 mt-lg-0">
  						${navItems}
					</ul>
					<form class="form-inline my-2 my-lg-0">
					<input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
					<button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
					</form>
				</div>
			</nav>
			${body}
		</body>
		<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
		<script src="./assets/script.js"></script>
	</html>`;

  fs.writeFile(page.fileName, template, errorHandler);
}

export function errorHandler(err) {
  if (err) return console.log(err);
  console.log("done");
}
