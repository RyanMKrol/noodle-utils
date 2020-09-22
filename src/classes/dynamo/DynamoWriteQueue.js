/** @memberof dynamo */

import sizeof from 'sizeof';
import DynamoDBWrapper from 'noodle-dynamo';

import { SizeExceeded } from '../../errors';

import {
  PROVISIONED_CAPACITY_UNITS,
  SINGLE_CAPACITY_UNIT_USED_TIME_MS,
  MAX_WRITE_DATA_SIZE_BYTES,
} from '../../constants';

/**
 * Creates a new Queue for pushing data to Dynamo.
 *
 * @class
 */
export default class DynamoWriteQueue {
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
      await this.persistBatch();
    }, SINGLE_CAPACITY_UNIT_USED_TIME_MS);
  }

  /**
   * Method to push items to our queue
   *
   * @param {object} item Any item that we want to push to Dynamo
   * @returns {void} Nothing
   */
  push(item) {
    if (sizeof.sizeof(item) < MAX_WRITE_DATA_SIZE_BYTES) {
      this.queue.push(item);
    } else {
      throw new SizeExceeded();
    }
  }

  /**
   * Method to push items to our queue
   *
   * @param {Array.<object>} batch A batch of items to push into the queue
   * @returns {void} Nothing
   */
  pushBatch(batch) {
    if (batch.some((x) => sizeof.sizeof(x) > MAX_WRITE_DATA_SIZE_BYTES)) {
      throw new SizeExceeded();
    }

    this.queue = this.queue.concat(batch);
  }

  /**
   * Method to push items to dynamo. This will take a chunk of the current
   * queue, and execute writes to Dynamo for each
   *
   * @returns {void} Nothing
   */
  async persistBatch() {
    if (this.queue.length > 0) {
      const batch = this.queue.splice(0, PROVISIONED_CAPACITY_UNITS);

      batch.forEach(async (item) => {
        this.dynamoClient.writeTable(this.tableName, item);
      });
    }
  }
}
