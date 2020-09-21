/** @memberof methods */

/**
 * Method to handle sequential tasks that rely on the output of the previous task
 *
 * @param {number} time The time, in ms, to sleep for
 * @returns {void} Nothing
 */
const sleep = (time) => new Promise((r) => setTimeout(r, time));

export default sleep;
