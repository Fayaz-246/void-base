/*
 * Format a string to the format: String [First Capital Rest Lowercase]
 */

export default function format(str: String) {
  return `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`;
}
