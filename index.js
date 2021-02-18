var fs = require("fs/promises");
var path = require("path");
var marked = require("marked");
var nunjucks = require("nunjucks");
var getFileContent = require("./get-file-content");

const TEMPLATE_FOLDER = path.join(__dirname, "testing");
const OUTPUT_FOLDER = path.join(__dirname, "output");
const VALID_EXTENSIONS = [".md", ".markdown", ".html"];
const MARKDOWN_EXTENSIONS = [".md", ".markdown"];

nunjucks.configure(["testing/includes", "testing/layouts"], {
  trimBlocks: true,
  lstripBlocks: true,
});

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
    var [content, meta] = await getFileContent(page);

    if (MARKDOWN_EXTENSIONS.includes(path.extname(page))) {
      page = page.replace(/.(md|markdown)$/, ".html");

      content = marked(content);
    }

    try {
      content = nunjucks.renderString(content, meta?.data);
    } catch (ex) {
      var stack = ex.message.split(/\n/g);
      return console.error(
        `Could not create \`${page}\`, ${stack[stack.length - 1].slice(
          9
        )}. This file will be skipped.`
      );
    }

    await fs.writeFile(path.join(OUTPUT_FOLDER, page), content);
  }
})().catch(console.error);
