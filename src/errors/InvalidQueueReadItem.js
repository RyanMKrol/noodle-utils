/**
 * Used when an item is passed to the DynamoReadQueue that doesn't contain the corret props
 */
class InvalidQueueReadItem extends Error {
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
      Error.captureStackTrace(this, InvalidQueueReadItem);
    }

    this.Error = 'InvalidQueueReadItem';
    this.StatusCode = 400;
  }
}

export default InvalidQueueReadItem;
