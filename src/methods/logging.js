/* eslint-disable no-await-in-loop */

import * as readline from 'readline';
import sleep from './sleep';

let statusIndicatorRunning = false;
/**
 * Start the status indicator
 *
 * @param output The message to continue printing
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

export { startStatusIndicator, stopStatusIndicator };
