import { access, readdir, writeFile } from "fs/promises";
import { nanoid } from "nanoid";

const of = (promise) =>
  Promise.resolve(promise)
    .then((result) => [result])
    .catch((err) => {
      if (typeof err === "undefined") {
        err = new Error("Rejection with empty value");
      }

      return [undefined, err];
    });

const MANIFEST_FILE_NAME = "manifest.json";

const [folderPath] = process.argv.slice(2);
if (!folderPath) {
  throw new Error("Folder path must be provided");
}

const [, pathErr] = await of(access(folderPath));
if (pathErr) {
  throw new Error(`Path don't exist: ${folderPath}`);
}

const folderName = folderPath.split("/").pop();
const initialManifestObject = {
  name: folderName,
  frames: [],
};

const [files] = await of(readdir(folderPath));
if (!files.length) {
  throw new Error(`Folder don't have any files: ${folderPath}`);
}

const manifest = files.reduce(
  (manifest, fileName) => ({
    ...manifest,
    frames: [
      ...manifest.frames,
      {
        id: nanoid(),
        file: `${folderPath}/${fileName}`,
      },
    ],
  }),
  initialManifestObject
);

const [, manifestErr] = await of(
  writeFile(`${folderPath}/${MANIFEST_FILE_NAME}`, JSON.stringify(manifest))
);
if (manifestErr) {
  throw new Error(`Couldn't write manifest file: ${manifestErr}`);
}

console.log("Manifest successfully created");
