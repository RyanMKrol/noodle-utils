/** @memberof errors */

/**
 * Used when the size of a write item to dynamo is too big
 */
class SizeExceeded extends Error {
  /**
   * Constructor of error
   *
   * @param {...any} params Any params to be passed to the Error parent
   */
  constructor(...params) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(...params);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, SizeExceeded);
    }

    this.Error = 'SizeExceeded';
    this.StatusCode = 500;
  }
}

export default SizeExceeded;
