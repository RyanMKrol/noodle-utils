import sizeof from 'sizeof';
import DynamoDBWrapper from 'noodle-dynamo';

import SizeExceeded from './errors';

// I only want my Dynamo table using 5 Write capacity units
// A WCU can be thought of as a 1K write
const PROVISIONED_WRITE_CAPACITY_UNITS = 5;

// Making this slightly over a second to give myself some
// buffer to not be right at the line of 5 WCU
const SINGLE_WRITE_CAPACITY_UNIT_TIME_MS = 1200;

// used to enforce the definition of a WCU, < 1kb per second
const MAX_WRITE_DATA_SIZE_BYTES = 1000;

/**
 * @typedef DynamoCredentials
 * @type {object}
 * @property {string} accessKeyId - The access ID for your dynamo table
 * @property {string} secretAccessKey - The access key for your dynamo table
 */

/**
 * Creates a new Queue for pushing data to Dynamo.
 *
 * @class
 */
export default class DynamoPersistanceQueue {
  /**
   * Constructor for DynamoPersistanceQueue
   *
   * @param {DynamoCredentials} dynamoCredentials - the credentials for your Dynamo table
   */
  constructor(dynamoCredentials) {
    this.dynamoClient = new DynamoDBWrapper(dynamoCredentials, 'us-east-2');
    this.queue = [];

    // setup the event queue
    setInterval(async () => {
      await this.persistBatch();
    }, SINGLE_WRITE_CAPACITY_UNIT_TIME_MS);
  }

  /**
   * Method to push items to our queue
   *
   * @param {object} item - Any item that we want to push to Dynamo
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
   * @param {Array.<object>} batch - A batch of items to push into the queue
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
      const batch = this.queue.splice(0, PROVISIONED_WRITE_CAPACITY_UNITS);

      batch.forEach(async (item) => {
        this.dynamoClient.writeTable('TickerData', item);
      });
    }
  }
}
