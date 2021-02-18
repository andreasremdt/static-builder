var fs = require("fs/promises");
var path = require("path");
var matter = require("gray-matter");

const TEMPLATE_FOLDER = path.join(__dirname, "testing");

module.exports = async function getFileContent(file) {
  var raw = await fs.readFile(path.join(TEMPLATE_FOLDER, file), "utf-8");
  var content = raw;

  if (matter.test(raw)) {
    var parsedFrontmatter = matter(raw);
    var rawFrontmatter = matter.stringify("", parsedFrontmatter?.data);
    content = raw.replace(rawFrontmatter, "");
  }

  return [content, parsedFrontmatter];
};
