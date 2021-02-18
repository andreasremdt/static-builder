var path = require("path");

const TEMPLATE_FOLDER = path.join(__dirname, "testing");
const OUTPUT_FOLDER = path.join(__dirname, "output");
const DATA_FOLDER = path.join(__dirname, "testing", "data");
const PAGES_FOLDER = path.join(__dirname, "testing", "pages");

const PAGE_EXTENSIONS = [".md", ".markdown", ".html"];
const VALID_EXTENSIONS = [".md", ".markdown", ".html"];
const MARKDOWN_EXTENSIONS = [".md", ".markdown"];
const YAML_EXTENSIONS = [".yml", ".yaml"];

module.exports = {
  TEMPLATE_FOLDER,
  DATA_FOLDER,
  PAGES_FOLDER,
  OUTPUT_FOLDER,
  PAGE_EXTENSIONS,
  VALID_EXTENSIONS,
  MARKDOWN_EXTENSIONS,
  YAML_EXTENSIONS,
};
