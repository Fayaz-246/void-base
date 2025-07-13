/*
 * Get all the names of the files in a specific directory
 */

import * as fs from "fs/promises";
import path from "path";

export default async function getAllFiles(
  dir: string,
  foldersOnly: boolean = false
): Promise<string[]> {
  const fileNames: string[] = [];

  const files = await fs.readdir(dir, { withFileTypes: true });

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
