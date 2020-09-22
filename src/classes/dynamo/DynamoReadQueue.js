/** @memberof dynamo */

import DynamoDBWrapper from 'noodle-dynamo';

import { PROVISIONED_CAPACITY_UNITS, SINGLE_CAPACITY_UNIT_USED_TIME_MS } from '../../constants';

import { DataNotFound, InvalidQueueReadItem } from '../../errors';
import { isUndefined } from '../../methods';

/**
 * @typedef ReadItem
 * @type {object}
 * @property {string} expression The expression to read the database with
 * @property {object} expressionData The data to provide to the above expression
 */

/**
 * @typedef ReadQueueItem
 * @type {object}
 * @property {ReadItem} readItem The item to be read from the database
 * @property {Function} callback The callback to call once the data has been read
 */

/**
 * Creates a new Queue for pushing data to Dynamo.
 *
 * @class
 */
class DynamoReadQueue {
  /**
   * Constructor for DynamoReadQueue
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
   * @param {ReadItem} item An item to be read from Dynamo
   * @param {Function} callback The method to be called once the item has been read
   */
  push(item, callback) {
    validateItem(item);
    validateCallback(callback);

    this.queue.push({ item, callback });
  }

  /**
   * Method to push items to our queue
   *
   * @param {Array.<ReadItem>} batch A batch of items to push into the queue
   * @param {Function} callback A method to be called for each read item
   * @returns {void} Nothing
   */
  pushBatch(batch, callback) {
    validateCallback(callback);
    batch.forEach((item) => validateItem(item));

    const queueItems = batch.map((item) => ({
      item,
      callback,
    }));

    this.queue = this.queue.concat(queueItems);
  }

  /**
   * Method to read a batch of items from dynamo
   *
   * @returns {void} Nothing
   */
  async readBatch() {
    if (this.queue.length > 0) {
      const batch = this.queue.splice(0, PROVISIONED_CAPACITY_UNITS);

      batch.forEach(async (queueItem) => {
        try {
          const readData = await this.dynamoClient.readTable(
            this.tableName,
            queueItem.item.expression,
            queueItem.item.expressionData,
          );

          if (readData.Count === 0) {
            throw new DataNotFound();
          }

          const dataItem = readData.Items;

          queueItem.callback(dataItem);
        } catch (e) {
          queueItem.callback(e);
        }
      });
    }
  }
}

/**
 * Validates that an item pushed to the queue is valid
 *
 * @param {ReadItem} item Specifies what to read from the database
 */
function validateItem(item) {
  if (isUndefined(item.expression)) {
    throw new InvalidQueueReadItem('Missing expression!');
  }
  if (isUndefined(item.expressionData)) {
    throw new InvalidQueueReadItem('Missing expressionData!');
  }
}

/**
 * Validates that the callback fulfils the requirements for a read
 *
 * @param {Function} callback The method to validate
 */
function validateCallback(callback) {
  if (isUndefined(callback)) {
    throw new InvalidQueueReadItem('Missing callback!');
  }
}

export default DynamoReadQueue;
