import async from 'async';
import DynamoDBWrapper from 'noodle-dynamo';

import { DataNotFound } from '../errors';
import { sleep } from '../methods';

// I only want my Dynamo table using 5 Write capacity units
// A WCU can be thought of as a 1K write
const PROVISIONED_READ_CAPACITY_UNITS = 5;

// Making this slightly over a second to give myself some
// buffer to not be right at the line of 5 WCU
const SINGLE_READ_CAPACITY_UNIT_TIME_MS = 1200;

/**
 * @typedef DynamoReadItem
 * @type {object}
 * @property {string} expression The expression to read the table with
 * @property {string} expressionData The data to provide to the read expression
 * @property {string} key The key to use in the returned object to store the data against
 */

/**
 * @typedef DynamoCredentials
 * @type {object}
 * @property {string} accessKeyId The access ID for your dynamo table
 * @property {string} secretAccessKey The access key for your dynamo table
 */

/**
 * Creates a new Queue for pushing data to Dynamo.
 *
 * @class
 */
export default class DynamoReadBatch {
  /**
   * Constructor for DynamoWriteQueue
   *
   * @param {DynamoCredentials} dynamoCredentials The credentials for your Dynamo table
   * @param {string} dynamoRegion The region of the Dynamo table we're using
   * @param {string} tableName The name of the table we want to store data in
   */
  constructor(dynamoCredentials, dynamoRegion, tableName) {
    this.dynamoClient = new DynamoDBWrapper(dynamoCredentials, dynamoRegion);
    this.tableName = tableName;
  }

  /**
   * Method to read items from Dynamo
   *
   * @param {Array.<DynamoReadItem>} readItems Items to read from the Dynamo table
   * @returns {object.<any>} An object containing the read data
   */
  async readItems(readItems) {
    const data = {};
    await async.mapLimit(readItems, PROVISIONED_READ_CAPACITY_UNITS, async (readItem) => {
      const { expression } = readItem;
      const { expressionData } = readItem;
      const { key } = readItem;

      try {
        const readData = await this.dynamoClient.readTable(
          this.tableName,
          expression,
          expressionData,
        );

        if (readData.Count !== 1) {
          throw new DataNotFound();
        }

        data[key] = readData;
      } catch (e) {
        data[key] = e;
      }

      await sleep(SINGLE_READ_CAPACITY_UNIT_TIME_MS);
    });

    return data;
  }
}
