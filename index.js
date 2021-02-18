var marked = require("marked");
var nunjucks = require("nunjucks");
var Parser = require("./parser");
var FileSystem = require("./file-system");
var { LAYOUT_FOLDER, INCLUDE_FOLDER } = require("./config");

nunjucks.configure([LAYOUT_FOLDER, INCLUDE_FOLDER], {
  trimBlocks: true,
  lstripBlocks: true,
});

var parser = new Parser();
var fileSystem = new FileSystem();

function clean() {
  return fileSystem.prepareOutputFolder();
}

function build() {
  var error = fileSystem.prepareOutputFolder();

  if (!error) {
    parser.getPages().forEach((page) => {
      var content = page.content;

      if (page.type == ".md" || page.type == ".markdown") {
        content = marked(page.content);
      }

      fileSystem.createPage(
        page.name + ".html",
        nunjucks.renderString(content, page?.data)
      );
    });
  }
}

module.exports = { build, clean };
