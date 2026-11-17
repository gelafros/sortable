/**
 * Parses the numeric height value (in centimeters) from the appearance height array.
 * Converts meters to centimeters if necessary, and returns null for missing values.
 *
 * @param {string[]} heightArray The height array containing imperial and metric values.
 * @returns {number|null} The parsed height in centimeters, or null if missing.
 */
export function getNumericHeight(heightArray) {
  if (!heightArray || heightArray.length < 2) {
    return null;
  }
  const rawCmStr = heightArray[1];
  if (!rawCmStr || rawCmStr === "-" || rawCmStr === "0 cm") {
    return null;
  }
  const cmStr = rawCmStr.trim();
  if (cmStr.endsWith(" meters")) {
    const meters = parseFloat(cmStr.replace(/,/g, ""));
    return Number.isNaN(meters) || meters === 0 ? null : meters * 100;
  }
  const cm = parseFloat(cmStr.replace(/,/g, ""));

  return Number.isNaN(cm) || cm === 0 ? null : cm;
}

/**
 * Parses the numeric weight value (in kilograms) from the appearance weight array.
 * Converts tons to kilograms if necessary, and returns null for missing values.
 *
 * @param {string[]} weightArray The weight array containing imperial and metric values.
 * @returns {number|null} The parsed weight in kilograms, or null if missing.
 */
export function getNumericWeight(weightArray) {
  if (!weightArray || weightArray.length < 2) {
    return null;
  }
  const rawKgStr = weightArray[1];
  if (!rawKgStr || rawKgStr === "-" || rawKgStr === "0 kg") {
    return null;
  }
  const kgStr = rawKgStr.trim();
  if (kgStr.endsWith(" tons")) {
    const tons = parseFloat(kgStr.replace(/,/g, ""));
    return Number.isNaN(tons) || tons === 0 ? null : tons * 1000;
  }
  const kg = parseFloat(kgStr.replace(/,/g, ""));
  return Number.isNaN(kg) || kg === 0 ? null : kg;
}

/**
 * Compares two values for sorting, ensuring missing values are always sorted last.
 *
 * @param {any} a The first value to compare.
 * @param {any} b The second value to compare.
 * @param {boolean} isAsc True if sorting in ascending order, false for descending.
 * @param {boolean} isNumeric True if values should be compared numerically, false for alphabetically.
 * @returns {number} A negative value if a < b, positive if a > b, or 0 if equal.
 */
export function compareValues(a, b, isAsc, isNumeric) {
  const isMissingA = a === null || a === undefined || a === "" || a === "-" || a === "null";
  const isMissingB = b === null || b === undefined || b === "" || b === "-" || b === "null";

  if (isMissingA && isMissingB) {
    return 0;
  }
  if (isMissingA) {
    return 1;
  } // 'a' (missing) goes last
  if (isMissingB) {
    return -1;
  } // 'b' (missing) goes last

  if (isNumeric) {
    const numA = Number(a);
    const numB = Number(b);
    return isAsc ? numA - numB : numB - numA;
  }

  const strA = String(a).toLowerCase();
  const strB = String(b).toLowerCase();
  return isAsc ? strA.localeCompare(strB) : strB.localeCompare(strA);
}

/**
 * Retrieves the sortable value from a hero object based on a dot-notated column path.
 *
 * @param {object} hero The hero object to extract the value from.
 * @param {string} col The dot-notated path of the property (e.g. 'biography.fullName').
 * @returns {any} The resolved sortable value.
 */
export function getSortValue(hero, col) {
  if (!hero) {
    return null;
  }
  if (col === "appearance.height") {
    return getNumericHeight(hero.appearance?.height);
  }
  if (col === "appearance.weight") {
    return getNumericWeight(hero.appearance?.weight);
  }

  // For nested fields like biography.fullName, we split by '.' and traverse
  const parts = col.split(".");
  let val = hero;
  for (const part of parts) {
    if (val === null || val === undefined) {
      return null;
    }
    val = val[part];
  }
  return val;
}
