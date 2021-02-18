var path = require("path");

const ROOT = process.cwd();
const OUTPUT_FOLDER = path.join(ROOT, "_site");
const DATA_FOLDER = path.join(ROOT, "data");
const PAGES_FOLDER = path.join(ROOT, "pages");
const INCLUDE_FOLDER = path.join(ROOT, "includes");
const LAYOUT_FOLDER = path.join(ROOT, "layouts");
const ASSET_FOLDER = path.join(ROOT, "assets");

const PAGE_EXTENSIONS = [".md", ".markdown", ".html"];
const MARKDOWN_EXTENSIONS = [".md", ".markdown"];
const YAML_EXTENSIONS = [".yml", ".yaml"];

module.exports = {
  ROOT,
  DATA_FOLDER,
  PAGES_FOLDER,
  INCLUDE_FOLDER,
  LAYOUT_FOLDER,
  ASSET_FOLDER,
  OUTPUT_FOLDER,
  PAGE_EXTENSIONS,
  MARKDOWN_EXTENSIONS,
  YAML_EXTENSIONS,
};
