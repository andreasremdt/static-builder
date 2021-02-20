import fs from "fs-extra";
import path from "path";
import glob from "glob";
import * as config from "./config.js";

/**
 * Returns an object with all collections from the `collections` folder.
 * Each collection is represented as a key (the name), which has an
 * array of files as value.
 *
 * @returns {Object}
 */
export function getCollectionData() {
  var pattern = `*{${config.MARKDOWN_EXTENSIONS.join(",")}}`;

  try {
    var collections = {};

    if (fs.existsSync(config.COLLECTION_FOLDER)) {
      for (let folder of fs.readdirSync(config.COLLECTION_FOLDER)) {
        if (fs.lstatSync(path.join(config.COLLECTION_FOLDER, folder)).isDirectory()) {
          var files = glob.sync(path.join(config.COLLECTION_FOLDER, folder, pattern));

          if (files.length > 0) {
            collections[folder] = [];
          }

          for (let file of files) {
            collections[folder].push({
              name: path.parse(file).name,
              content: fs.readFileSync(file, "utf-8"),
            });
          }
        }
      }
    }

    return collections;
  } catch (ex) {
    console.error(ex);
  }
}

/**
 * Returns an array with all pages from the `pages` folder.
 *
 * @returns {Array}
 */
export function getPageData() {
  var pattern = `*{${config.PAGE_EXTENSIONS.join(",")}}`;

  try {
    var pages = [];

    if (fs.existsSync(config.PAGES_FOLDER)) {
      var files = glob.sync(path.join(config.PAGES_FOLDER, "**", pattern));

      for (let file of files) {
        pages.push({
          ...path.parse(file),
          content: fs.readFileSync(file, "utf-8"),
        });
      }
    }

    return pages;
  } catch (ex) {
    console.error(ex);
  }
}

/**
 * Returns an object with all the site data from the `data` folder.
 * Each file is represented as a key (the name), which has the file contents
 * as a value.
 *
 * @returns {Object}
 */
export function getSiteData() {
  var pattern = `*{${config.YAML_EXTENSIONS.join(",")}}`;

  try {
    var data = {};

    if (fs.existsSync(config.DATA_FOLDER)) {
      var files = glob.sync(path.join(config.DATA_FOLDER, "**", pattern));

      for (let file of files) {
        var { name } = path.parse(file);

        data[name] = fs.readFileSync(file, "utf-8");
      }
    }

    return data;
  } catch (ex) {
    console.error(ex);
  }
}

/**
 * Cleans the output folder by deleting and creating it again.
 *
 * @returns {void}
 */
export function prepareOutputFolder() {
  try {
    fs.emptyDirSync(config.OUTPUT_FOLDER);
  } catch (ex) {
    console.error(ex);
  }
}

/**
 * Copies all assets into the `_site` folder.
 *
 * @returns {void}
 */
export function copyAssets() {
  var pattern = "**/*";

  try {
    if (fs.existsSync(config.ASSET_FOLDER)) {
      var assets = glob.sync(path.join(config.ASSET_FOLDER, pattern));

      for (let asset of assets) {
        var { base, dir } = path.parse(asset);
        var targetPath = dir.replace(config.ASSET_FOLDER, config.OUTPUT_FOLDER);

        fs.copySync(asset, path.join(targetPath, base));
      }
    }
  } catch (ex) {
    console.error(ex);
  }
}
