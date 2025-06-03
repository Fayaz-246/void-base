/*
 * Get all the names of the files in a specific directory
 */

import fs from "fs";
import path from "path";

export default function getAllFiles(
  dir: string,
  foldersOnly: boolean = false,
): string[] {
  const fileNames: string[] = [];

  const files = fs.readdirSync(dir, { withFileTypes: true });

  for (const file of files) {
    const filePath = path.join(dir, file.name);

    if (foldersOnly) {
      if (file.isDirectory()) fileNames.push(filePath);
    } else {
      if (file.isFile()) fileNames.push(filePath);
    }
  }

  return fileNames;
}
