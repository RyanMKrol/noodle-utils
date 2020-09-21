/** @memberof methods */

/**
 * Helper method to determine if a value is undefined or not
 *
 * @param {any} value The value to check
 * @returns {boolean} Whether the value is undefined or not
 */
function isUndefined(value) {
  return typeof value === 'undefined' || value === null;
}

export default isUndefined;
