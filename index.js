var fs = require("fs").promises;
var path = require("path");
var marked = require("marked");

const TEMPLATE_FOLDER = path.join(__dirname, "testing");
const OUTPUT_FOLDER = path.join(__dirname, "output");
const VALID_EXTENSIONS = [".md", ".markdown", ".html"];
const MARKDOWN_EXTENSIONS = [".md", ".markdown"];

(async () => {
  var files = await fs.readdir(TEMPLATE_FOLDER);
  var pages = [];

  for (let file of files) {
    var stat = await fs.lstat(path.join(TEMPLATE_FOLDER, file));

    if (stat.isFile() && VALID_EXTENSIONS.includes(path.extname(file))) {
      pages.push(file);
    }
  }

  for (let page of pages) {
    var content = await fs.readFile(path.join(TEMPLATE_FOLDER, page), "utf-8");

    if (MARKDOWN_EXTENSIONS.includes(path.extname(page))) {
      page = page.replace(/.(md|markdown)$/, ".html");
      content = marked(content);
    }

    await fs.writeFile(path.join(OUTPUT_FOLDER, page), content);
  }
})().catch(console.error);
