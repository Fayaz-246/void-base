/*
 * This is to check if 2 Slash Commands Are Roughly The Same
 */

const IGNORED_KEYS = new Set([
  "id",
  "version",
  "applicationId",
  "guild",
  "guildId",
  "permissions",
  "nameLocalizations",
  "nameLocalized",
  "descriptionLocalizations",
  "descriptionLocalized",
  "nsfw",
  "dmPermission",
  "contexts",
  "integrationTypes",
]);

function cleanForComparison(obj: any): any {
  if (Array.isArray(obj)) {
    return obj
      .map(cleanForComparison)
      .filter((v) => v !== undefined && v !== null);
  } else if (typeof obj === "object" && obj !== null) {
    const newObj: any = {};
    for (const key in obj) {
      if (IGNORED_KEYS.has(key)) continue;
      const value = cleanForComparison(obj[key]);
      // Skip undefined/null/empty arrays
      if (
        value === undefined ||
        value === null ||
        (Array.isArray(value) && value.length === 0)
      ) {
        continue;
      }
      newObj[key] = value;
    }
    return newObj;
  }
  return obj;
}

function getObjectHash(obj: any): string {
  const cleaned = cleanForComparison(obj);
  return JSON.stringify(cleaned, Object.keys(cleaned).sort());
}

export default function looselyEqual(a: any, b: any): boolean {
  return getObjectHash(a) === getObjectHash(b);
}
