/** @memberof dynamo */

import async from 'async';
import DynamoDBWrapper from 'noodle-dynamo';

import { DataNotFound } from '../../errors';
import { sleep } from '../../methods';

import { PROVISIONED_CAPACITY_UNITS, SINGLE_CAPACITY_UNIT_USED_TIME_MS } from '../../constants';

/**
 * @typedef ReadBatchItem
 * @type {object}
 * @property {string} expression The expression to read the table with
 * @property {string} expressionData The data to provide to the read expression
 * @property {string} key The key to use in the returned object to store the data against
 */

/**
 * Creates a new Queue for pushing data to Dynamo.
 *
 * @class
 */
export default class DynamoReadBatch {
  /**
   * Constructor for DynamoReadBatch
   *
   * @param {module:dynamo.DynamoCredentials} dynamoCredentials The credentials for a Dynamo table
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
   * @param {Array.<ReadBatchItem>} readItems Items to read from the Dynamo table
   * @returns {object.<any>} An object containing the read data
   */
  async readItems(readItems) {
    const data = {};
    await async.mapLimit(readItems, PROVISIONED_CAPACITY_UNITS, async (readItem) => {
      const { expression } = readItem;
      const { expressionData } = readItem;
      const { key } = readItem;

      try {
        const readData = await this.dynamoClient.readTable(
          this.tableName,
          expression,
          expressionData,
        );

        if (readData.Count === 0) {
          throw new DataNotFound();
        }

        const dataItem = readData.Items;

        data[key] = dataItem;
      } catch (e) {
        data[key] = e;
      }

      await sleep(SINGLE_CAPACITY_UNIT_USED_TIME_MS);
    });

    return data;
  }
}
