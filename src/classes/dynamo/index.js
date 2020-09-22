/** @module dynamo */

/**
 * @typedef DynamoCredentials
 * @type {object}
 * @property {string} accessKeyId The access ID for your dynamo table
 * @property {string} secretAccessKey The access key for your dynamo table
 */

export { default as DynamoReadBatch } from './DynamoReadBatch';
export { default as DynamoReadQueue } from './DynamoReadQueue';
export { default as DynamoWriteQueue } from './DynamoWriteQueue';
