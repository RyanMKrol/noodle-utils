/** @memberof dynamo */

import DynamoDBWrapper from 'noodle-dynamo';

import { PROVISIONED_CAPACITY_UNITS, SINGLE_CAPACITY_UNIT_USED_TIME_MS } from '../../constants';

import { DataNotFound, InvalidQueueReadItem } from '../../errors';
import { isUndefined } from '../../methods';

/**
 * @typedef ReadQueueItem
 * @type {object}
 * @property {string} expression The expression to read the database with
 * @property {object} expressionData The data to provide to the above expression
 * @property {Function} callback The callback to call once the data has been read
 */

/**
 * Creates a new Queue for pushing data to Dynamo.
 *
 * @class
 */
class DynamoReadQueue {
  /**
   * Constructor for DynamoWriteQueue
   *
   * @param {module:dynamo.DynamoCredentials} dynamoCredentials The credentials for a Dynamo table
   * @param {string} dynamoRegion The region of the Dynamo table we're using
   * @param {string} tableName The name of the table we want to store data in
   */
  constructor(dynamoCredentials, dynamoRegion, tableName) {
    this.dynamoClient = new DynamoDBWrapper(dynamoCredentials, dynamoRegion);
    this.queue = [];
    this.tableName = tableName;

    // setup the event queue
    setInterval(async () => {
      await this.readBatch();
    }, SINGLE_CAPACITY_UNIT_USED_TIME_MS);
  }

  /**
   * Pushes item to be read into the queue
   *
   * @param {ReadQueueItem} item An item to be read from Dynamo
   */
  push(item) {
    validateItem(item);
    this.queue.push(item);
  }

  /**
   * Method to push items to our queue
   *
   * @param {Array.<ReadQueueItem>} batch A batch of items to push into the queue
   * @returns {void} Nothing
   */
  pushBatch(batch) {
    batch.forEach((item) => validateItem(item));
    this.queue = this.queue.concat(batch);
  }

  /**
   * Method to push items to dynamo. This will take a chunk of the current
   * queue, and execute writes to Dynamo for each
   *
   * @returns {void} Nothing
   */
  async readBatch() {
    if (this.queue.length > 0) {
      const batch = this.queue.splice(0, PROVISIONED_CAPACITY_UNITS);

      batch.forEach(async (item) => {
        try {
          const readData = await this.dynamoClient.readTable(
            this.tableName,
            item.expression,
            item.expressionData,
          );

          if (readData.Count !== 1) {
            throw new DataNotFound();
          }

          const dataItem = readData.Items[0];

          item.callback(dataItem);
        } catch (e) {
          item.callback(e);
        }
      });
    }
  }
}

/**
 * Validates that an item pushed to the queue is valid
 *
 * @param {ReadQueueItem} item Specifies what to read from the database
 */
function validateItem(item) {
  if (isUndefined(item.expression)) {
    throw new InvalidQueueReadItem('Missing expression');
  }
  if (isUndefined(item.expressionData)) {
    throw new InvalidQueueReadItem('Missing expressionData');
  }
  if (isUndefined(item.callback)) {
    throw new InvalidQueueReadItem('Missing callback');
  }
}

export default DynamoReadQueue;
