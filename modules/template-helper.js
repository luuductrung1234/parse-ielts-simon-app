import * as fs from "fs";

export function generate(page, configs) {
  let data = "";
  page.articles.forEach((a) => {
    data += `<div class="col-xl-4 col-md-6 col-12">
	<h5>${a.date}</h5>
	<h4><a target="_blank" rel="noopener noreferrer" href="${a.url}">${a.title}</a></h4>
	<p>${a.body}</p>
	</div>`;
  });

  let navItems = "";
  configs.pages.forEach((pageConfig) => {
    if (page.fileName === pageConfig.fileName)
      navItems += `
		<li class="nav-item active">
			<a class="nav-link" href="#" aria-current="page">${pageConfig.pageName} <span class="sr-only">(current)</span></a>
		</li>`;
    else
      navItems += `
		<li class="nav-item">
			<a class="nav-link" href="./${pageConfig.fileName}">${pageConfig.pageName}</a>
		</li>`;
  });

  let header = `
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<meta name="thomas" content="">
	<title>${page.pageName}</title>
	<link rel="icon" type="image/x-icon" href="./assets/favicon.ico"/>
	<link rel="stylesheet" href="./assets/style.css">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/github-fork-ribbon-css/0.2.3/gh-fork-ribbon.min.css" />
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">`;

  let body = `<div class="container-fluid articles-container" style="width: 90%">
	<div class="row align-items-start">${data}</div></div>`;

  let template = `<!DOCTYPE html>
	<html><head>
		${header}
		</head><body>
  			<a class="github-fork-ribbon" href="https://github.com/luuductrung1234/parse-ielts-simon-app" data-ribbon="Fork me on GitHub" title="Fork me on GitHub">Fork me on GitHub</a>

			<nav class="navbar navbar-expand-lg fixed-top navbar-light bg-light">
			<div class="container-fluid">
				<a class="navbar-brand" href="#"><img src="./assets/favicon-32x32.png" alt="Thomas & IELTS"></a>
				<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
				</button>
				<div class="collapse navbar-collapse" id="navbarTogglerDemo02">
				<ul class="navbar-nav me-auto mb-2 mb-lg-0">
  					${navItems}
				</ul>
				<form class="d-flex">
					<input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
					<button class="btn btn-outline-success" type="submit">Search</button>
				</form>
				</div>
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
