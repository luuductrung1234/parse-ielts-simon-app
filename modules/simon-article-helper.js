import { httpHelper } from "./http-helper.js";

export let simonHelper = {
  getPages: async function (configs) {
    const $ = await httpHelper.get({
      startPage: configs.startPage,
      endPage: configs.endPage,
      hostname: "www.ielts-simon.com",
      path: "/ielts-help-and-english-pr",
      subPath: "/page/",
    });

    const pages = [];
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

    console.log(`found ${articleCount} articles.`);

    configs.pages.forEach((pageConfig) => {
      let page = {
        fileName: pageConfig.fileName,
        pageName: pageConfig.pageName,
        articles: [],
      };

      for (let index = 0; index < articleCount; index++) {
        if (
          pageConfig.searchText.length > 0 &&
          pageConfig.searchText.every(
            (text) => !articleHeaders[index].includes(text)
          )
        )
          continue;

        page.articles.push({
          date: articleDates[index],
          title: articleHeaders[index],
          url: articleUrls[index],
          body: articleBodies[index],
        });
      }

      pages.push(page);
    });

    console.log(`grouped into ${pages.length} pages.`);

    return pages;
  },
};
