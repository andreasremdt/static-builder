var fs = require("fs");
var path = require("path");
var matter = require("gray-matter");
var {
  DATA_FOLDER,
  PAGES_FOLDER,
  YAML_EXTENSIONS,
  PAGE_EXTENSIONS,
} = require("./config");

class Parser {
  getSiteData() {
    try {
      if (fs.existsSync(DATA_FOLDER)) {
        return fs
          .readdirSync(DATA_FOLDER)
          .filter((file) => YAML_EXTENSIONS.includes(path.extname(file)))
          .map((file) => ({
            name: path.basename(file, path.extname(file)),
            content: fs.readFileSync(path.join(DATA_FOLDER, file), "utf-8"),
          }))
          .map((file) => ({
            ...file,
            content: matter(["---", file.content, "---"].join("\n")).data,
          }));
      }
    } catch (ex) {
      console.error(ex.message);

      return [];
    }
  }

  getPages() {
    try {
      if (fs.existsSync(PAGES_FOLDER)) {
        return fs
          .readdirSync(PAGES_FOLDER)
          .filter(
            (file) =>
              fs.lstatSync(path.join(PAGES_FOLDER, file)).isFile() &&
              PAGE_EXTENSIONS.includes(path.extname(file))
          )
          .map((file) => ({
            name: path.basename(file, path.extname(file)),
            type: path.extname(file),
            content: fs.readFileSync(path.join(PAGES_FOLDER, file), "utf-8"),
          }))
          .map((file) => {
            if (matter.test(file.content)) {
              return {
                ...file,
                ...matter(file.content),
              };
            }

            return file;
          });
      }
    } catch (ex) {
      console.error(ex.message);

      return [];
    }
  }

  getCollectionData() {}
}

module.exports = Parser;
