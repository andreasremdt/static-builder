var fs = require("fs");
var path = require("path");
const { OUTPUT_FOLDER } = require("./config");

class FileSystem {
  prepareOutputFolder() {
    try {
      if (fs.existsSync(OUTPUT_FOLDER)) {
        fs.rmSync(OUTPUT_FOLDER, { recursive: true });
      }

      fs.mkdirSync(OUTPUT_FOLDER);
    } catch (ex) {
      return true;
    }
  }

  createPage(name, content) {
    try {
      fs.writeFileSync(path.join(OUTPUT_FOLDER, name), content);
    } catch (ex) {
      return true;
    }
  }
}

module.exports = FileSystem;
