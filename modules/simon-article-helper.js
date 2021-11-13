import { httpHelper } from "./http-helper.js";

export let simonHelper = {
  getArticles: async function (filter) {
    const $ = await httpHelper.get({
      startPage: filter.startPage,
      endPage: filter.endPage,
      hostname: "www.ielts-simon.com",
      path: "/ielts-help-and-english-pr",
      subPath: "/page/",
    });

    const articles = [];
    const articleDates = [];
    const articleHeaders = [];
    const articleUrls = [];
    const articleBodies = [];

    let articleCount = 0;

    $.forEach((page) => {
      let headers = page("*").find(".entry-header > a");
      articleCount += headers.length;

      headers.each(function (index, header) {
        articleHeaders.push(page(header).html());
        articleUrls.push(page(header).attr("href"));
      });

      let dates = page("body").find(".date-header");

      dates.each(function (index, date) {
        articleDates.push(page(date).html());
      });

      let bodies = page("*").find(".entry-body");

      bodies.each(function (index, body) {
        articleBodies.push(page(body).html());
      });
    });

    for (let index = 0; index < articleCount; index++) {
      if (
        filter.searchText.length > 0 &&
        filter.searchText.every((text) => !articleHeaders[index].includes(text))
      )
        continue;

      articles.push({
        date: articleDates[index],
        title: articleHeaders[index],
        url: articleUrls[index],
        body: articleBodies[index],
      });
    }

    console.log(`found ${articleCount} articles`);

    return articles;
  },
};
