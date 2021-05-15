/** @module DynamoScan */

import DynamoDBWrapper from 'noodle-dynamo';

/**
 * Creates a class to scan Dynamo tables
 */
class DynamoScan {
  /**
   * Constructor for DynamoScan
   *
   * @param {module:dynamo.DynamoCredentials} dynamoCredentials The credentials for a Dynamo table
   * @param {string} dynamoRegion The region of the Dynamo table we're using
   */
  constructor(dynamoCredentials, dynamoRegion) {
    this.dynamoClient = new DynamoDBWrapper(dynamoCredentials, dynamoRegion);
  }

  /**
   * Method to scan table in Dynamo
   *
   * @param {string} tableName Table to scan
   * @returns {Promise<object.<any>>} An object containing the read data
   */
  async scanTable(tableName) {
    return this.dynamoClient.scanTable(tableName);
  }
}

export default DynamoScan;
