var fs = require("fs");
var path = require("path");
var marked = require("marked");
var nunjucks = require("nunjucks");
var Parser = require("./parser");
var FileSystem = require("./file-system");
var { OUTPUT_FOLDER, LAYOUT_FOLDER, INCLUDE_FOLDER } = require("./config");

nunjucks.configure([LAYOUT_FOLDER, INCLUDE_FOLDER], {
  trimBlocks: true,
  lstripBlocks: true,
});

var parser = new Parser();
var fileSystem = new FileSystem();

var error = fileSystem.prepareOutputFolder();

if (!error) {
  parser.getPages().forEach((page) => {
    var content = page.content;

    if (page.type == ".md" || page.type == ".markdown") {
      content = marked(page.content);
    }

    try {
      fs.writeFileSync(
        path.join(OUTPUT_FOLDER, page.name + ".html"),
        nunjucks.renderString(content, page?.data)
      );
    } catch (ex) {
      console.error(ex.message);
    }
  });
}
