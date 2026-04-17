import fs from "node:fs";
import path from "node:path";

const distDir = path.resolve(process.cwd(), "dist");
const indexPath = path.join(distDir, "index.html");
const notFoundPath = path.join(distDir, "404.html");
const noJekyllPath = path.join(distDir, ".nojekyll");

if (!fs.existsSync(indexPath)) {
  throw new Error(`Missing build artifact: ${indexPath}`);
}

fs.copyFileSync(indexPath, notFoundPath);
fs.writeFileSync(noJekyllPath, "");

console.log("GitHub Pages artifacts prepared: 404.html and .nojekyll created.");