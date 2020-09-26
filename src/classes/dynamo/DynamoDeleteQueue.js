/** @module DynamoDeleteQueue */

import DynamoDBWrapper from 'noodle-dynamo';

import { PROVISIONED_CAPACITY_UNITS, SINGLE_CAPACITY_UNIT_USED_TIME_MS } from '../../constants';

/**
 * @typedef DeleteQueueItem
 * @type {object}
 */

/**
 * Creates a new Queue for removing data from Dynamo.
 */
class DynamoDeleteQueue {
  /**
   * Constructor for DynamoDeleteQueue
   *
   * @param {module:dynamo.DynamoCredentials} dynamoCredentials The credentials for a Dynamo table
   * @param {string} dynamoRegion The region of the Dynamo table we're using
   * @param {string} tableName The name of the table we want to remove data from
   */
  constructor(dynamoCredentials, dynamoRegion, tableName) {
    this.dynamoClient = new DynamoDBWrapper(dynamoCredentials, dynamoRegion);
    this.queue = [];
    this.tableName = tableName;

    // setup the event queue
    setInterval(async () => {
      await this.deleteBatch();
    }, SINGLE_CAPACITY_UNIT_USED_TIME_MS);
  }

  /**
   * Method to push items to our queue
   *
   * @param {module:DynamoDeleteQueue.DeleteQueueItem} item Any item that we want to delete
   * @param {?Function} callback A method to call once the item has been deleted
   * @returns {void} Nothing
   */
  push(item, callback) {
    this.queue.push({ item, callback });
  }

  /**
   * Method to push items to our queue
   *
   * @param {Array.<module:DynamoDeleteQueue.DeleteQueueItem>} batch A batch of items
   *  to delete from the db
   * @param {?Function} callback A method to call once the item has been deleted
   * @returns {void} Nothing
   */
  pushBatch(batch, callback) {
    const batchWithCallbacks = batch.map((item) => ({
      item,
      callback,
    }));

    this.queue = this.queue.concat(batchWithCallbacks);
  }

  /**
   * Method to delete items from dynamo. This will take a chunk of the current
   * queue, and execute deletes in Dynamo for each
   *
   * @private
   * @returns {void} Nothing
   */
  async deleteBatch() {
    if (this.queue.length > 0) {
      const batch = this.queue.splice(0, PROVISIONED_CAPACITY_UNITS);

      batch.forEach(async (queueItem) => {
        this.dynamoClient.deleteItemFromTable(this.tableName, queueItem.item).then((result) => {
          if (queueItem.callback) {
            queueItem.callback(result);
          }
        });
      });
    }
  }
}

export default DynamoDeleteQueue;
