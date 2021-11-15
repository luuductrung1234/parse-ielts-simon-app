import { request } from "https";
import { load } from "cheerio";
import { Spinner } from "cli-spinner";

export let httpHelper = {
  get: async function (options) {
    const $ = [];

    for (let index = options.startPage; index <= options.endPage; index++) {
      let subPath = `${options.subPath}${index}/`;
      let res = await httpsGet(options.hostname, options.path + subPath, {});
      $.push(load(res));
    }

    console.log(`\nfinished! loaded ${$.length} pages.\n`);

    return $;
  },
};

const spinner = new Spinner("loading... %s");
spinner.setSpinnerString("|/-\\");

export async function httpsGet(hostname, path, headers) {
  return new Promise(async (resolve, reject) => {
    const options = {
      hostname: hostname,
      path: path,
      port: 443,
      method: "GET",
      headers: headers,
    };

    let body = [];

    const req = request(options, (res) => {
      spinner.start();
      res.on("data", (chunk) => body.push(chunk));
      res.on("end", () => {
        spinner.stop();
        const data = Buffer.concat(body).toString();
        resolve(data);
      });
    });
    req.on("error", (e) => {
      spinner.stop();
      reject(e);
    });
    req.end();
  });
}

export async function httpsPost(hostname, path, data) {
  return new Promise(async (resolve, reject) => {
    const options = {
      hostname: hostname,
      path: path,
      port: 443,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = [];

    const req = request(options, (res) => {
      spinner.start();
      res.on("data", (d) => {
        body.push(d);
      });
      res.on("end", () => {
        spinner.stop();
        resolve(Buffer.concat(body).toString());
      });
    });
    req.on("error", (e) => {
      spinner.stop();
      reject(e);
    });
    req.write(JSON.stringify(data));
    req.end();
  });
}
