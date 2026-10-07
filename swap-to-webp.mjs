import fs from "fs";
import path from "path";

const replacements = {
  "about-oregon.png": "about-oregon.webp",
  "about-radiata.png": "about-radiata.webp",
  "about-realista.png": "about-realista.webp",
  "bruto-comparador.png": "bruto-comparador.webp",
  "canto-natural.png": "canto-natural.webp",
  "cepillado-comparador.png": "cepillado-comparador.webp",
  "logo-maderas-mm.png": "logo-maderas-mm.webp",
  "pino-bruto.png": "pino-bruto.webp",
  "pino-cepillado.png": "pino-cepillado.webp",
  "tablones-rusticos.png": "tablones-rusticos.webp",
  "viga-2.png": "viga-2.webp",
  "viga.png": "viga.webp",
};

const folders = ["src"];
const validExts = new Set([".js", ".jsx", ".ts", ".tsx", ".css"]);

function walk(dir) {
  let results = [];
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      results = results.concat(walk(fullPath));
    } else {
      const ext = path.extname(item.name).toLowerCase();
      if (validExts.has(ext)) results.push(fullPath);
    }
  }
  return results;
}

for (const folder of folders) {
  if (!fs.existsSync(folder)) continue;

  const files = walk(folder);

  for (const file of files) {
    let content = fs.readFileSync(file, "utf8");
    let original = content;

    for (const [from, to] of Object.entries(replacements)) {
      content = content.split(from).join(to);
    }

    if (content !== original) {
      fs.writeFileSync(file, content, "utf8");
      console.log(`Updated: ${file}`);
    }
  }
}