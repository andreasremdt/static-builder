var fs = require("fs");
const { OUTPUT_FOLDER } = require("./config");

class FileSystem {
  prepareOutputFolder() {
    try {
      if (fs.existsSync(OUTPUT_FOLDER)) {
        fs.rmSync(OUTPUT_FOLDER, { recursive: true });
      }

      fs.mkdirSync(OUTPUT_FOLDER);
    } catch (ex) {
      return ex;
    }
  }
}

module.exports = FileSystem;
