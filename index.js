import { simonHelper } from "./modules/simon-article-helper.js";
import { generate } from "./modules/template-helper.js";

var configs = {
  startPage: 1,
  endPage: 92,
  pages: [
    {
      fileName: "index.html",
      pageName: "Writing Task 2",
      searchText: [
        "IELTS Writing Task 2",
        "IELTS Advice",
        "IELTS Grammar",
        "IELTS Vocabulary",
      ],
    },
    {
      fileName: "writing-task-1.html",
      pageName: "Writing Task 1",
      searchText: [
        "IELTS Writing Task 1",
        "IELTS Advice",
        "IELTS Grammar",
        "IELTS Vocabulary",
      ],
    },
    {
      fileName: "reading.html",
      pageName: "Reading",
      searchText: ["IELTS Reading"],
    },
    {
      fileName: "listening.html",
      pageName: "Listening",
      searchText: ["IELTS Listening"],
    },
    {
      fileName: "speaking.html",
      pageName: "Speaking",
      searchText: [
        "IELTS Speaking",
        "IELTS Advice",
        "IELTS Grammar",
        "IELTS Speaking / Grammar",
        "IELTS Vocabulary",
      ],
    },
  ],
  // relatedToDate: "",
  // previousNumber: 2,
  // nextNumber: 2,
};

let pages = await simonHelper.getPages(configs);

pages.forEach((page) => generate(page, configs));
