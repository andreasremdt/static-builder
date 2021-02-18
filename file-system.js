var fs = require("fs");
var path = require("path");
const { OUTPUT_FOLDER, ASSET_FOLDER } = require("./config");

class FileSystem {
  prepareOutputFolder() {
    try {
      if (fs.existsSync(OUTPUT_FOLDER)) {
        fs.rmSync(OUTPUT_FOLDER, { recursive: true });
      }

      fs.mkdirSync(OUTPUT_FOLDER);
    } catch (ex) {
      console.log(ex.message);
      return true;
    }
  }

  createPage(name, content) {
    try {
      fs.writeFileSync(path.join(OUTPUT_FOLDER, name), content);
    } catch (ex) {
      console.log(ex.message);
      return true;
    }
  }

  copyAssets() {
    try {
      if (fs.existsSync(ASSET_FOLDER)) {
        var assets = fs.readdirSync(ASSET_FOLDER);

        for (let asset of assets) {
          fs.copyFileSync(
            path.join(ASSET_FOLDER, asset),
            path.join(OUTPUT_FOLDER, asset)
          );
        }
      }
    } catch (ex) {
      console.log(ex.message);
      return true;
    }
  }
}

module.exports = FileSystem;
