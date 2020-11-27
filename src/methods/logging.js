/* eslint-disable no-await-in-loop */

import * as readline from 'readline';
import debug from 'debug';
import sleep from './sleep';

let statusIndicatorRunning = false;
/**
 * Start the status indicator
 *
 * @param {string} output The message to continue printing
 */
async function startStatusIndicator(output) {
  statusIndicatorRunning = true;

  while (statusIndicatorRunning) {
    if (statusIndicatorRunning) {
      writeStatusOutput(`${output}`);
      await sleep(500);
    }
    if (statusIndicatorRunning) {
      writeStatusOutput(`${output}.`);
      await sleep(500);
    }
    if (statusIndicatorRunning) {
      writeStatusOutput(`${output}..`);
      await sleep(500);
    }
    if (statusIndicatorRunning) {
      writeStatusOutput(`${output}...`);
      await sleep(500);
    }
  }
}

/**
 * Stop the status indicator
 */
function stopStatusIndicator() {
  statusIndicatorRunning = false;
  process.stdout.write('\n');
}

/**
 * Method to write to stdout such that it can be cleared later
 *
 * @param {string} output What to post to stdout
 */
function writeStatusOutput(output) {
  readline.clearLine(process.stdout, 0);
  readline.cursorTo(process.stdout, 0, null);
  process.stdout.write(output);
}

/**
 * @typedef DebugLogger
 * @see https://www.npmjs.com/package/debug
 */

/**
 * Builds a logger and returns it
 *
 * @param {string} namespace The namespace to use for logging
 * @returns {DebugLogger} A logger
 */
function logger(namespace) {
  return debug(namespace);
}

export { startStatusIndicator, stopStatusIndicator, logger };
