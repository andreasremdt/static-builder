import path from "path";

export const ROOT = process.cwd();
export const OUTPUT_FOLDER = path.join(ROOT, "_site");
export const DATA_FOLDER = path.join(ROOT, "data");
export const PAGES_FOLDER = path.join(ROOT, "pages");
export const INCLUDE_FOLDER = path.join(ROOT, "includes");
export const LAYOUT_FOLDER = path.join(ROOT, "layouts");
export const ASSET_FOLDER = path.join(ROOT, "assets");
export const COLLECTION_FOLDER = path.join(ROOT, "collections");

export const PAGE_EXTENSIONS = [".md", ".markdown", ".html"];
export const MARKDOWN_EXTENSIONS = [".md", ".markdown"];
export const YAML_EXTENSIONS = [".yml", ".yaml"];
