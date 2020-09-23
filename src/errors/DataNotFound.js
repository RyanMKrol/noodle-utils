/**
 * Used when an item isn't found in Dynamo on read
 */
class DataNotFound extends Error {
  /**
   * Constructor of error
   *
   * @memberof module:Errors
   * @param {...any} params Any params that need to be passed to parent
   */
  constructor(...params) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(...params);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, DataNotFound);
    }

    this.Error = 'DataNotFound';
    this.StatusCode = 404;
  }
}

export default DataNotFound;
