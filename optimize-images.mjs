import sharp from "sharp";
import fs from "fs";
import path from "path";

const folder = "./public/assets";

const files = fs
  .readdirSync(folder)
  .filter((file) => /\.(png|jpg|jpeg)$/i.test(file));

for (const file of files) {
  const input = path.join(folder, file);
  const output = path.join(
    folder,
    file.replace(/\.(png|jpg|jpeg)$/i, ".webp")
  );

  await sharp(input)
    .resize({
      width: 1600,
      withoutEnlargement: true,
    })
    .webp({
      quality: 80,
      effort: 6,
    })
    .toFile(output);

  const oldSize = fs.statSync(input).size / 1024 / 1024;
  const newSize = fs.statSync(output).size / 1024 / 1024;

  console.log(
    `${file}: ${oldSize.toFixed(2)} MB → ${newSize.toFixed(2)} MB`
  );
}