/*
 * Removes all NULL and UNDEFINED values from an object
 */

function filterNullAndUndefined<T>(obj: T): T {
  if (Array.isArray(obj)) {
    return obj
      .map((item) => filterNullAndUndefined(item))
      .filter((item) => item !== null && item !== undefined) as T;
  } else if (typeof obj === "object" && obj !== null) {
    const cleanedObj: any = {};
    for (const key in obj) {
      const value = (obj as any)[key];
      if (value !== undefined && value !== null) {
        cleanedObj[key] = filterNullAndUndefined(value);
      }
    }
    return cleanedObj;
  }

  return obj;
}

export default filterNullAndUndefined;
