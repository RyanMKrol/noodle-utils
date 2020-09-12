/**
 * @module Pipeline
 */

/**
 * Method to handle sequential tasks that rely on the output of the previous task
 *
 * @param {Array.<Function>} fns - The functions you would like to run over the input
 * @returns {any} The result of the pipeline processing
 */
const pipeline = (...fns) => (x) => fns.reduce((v, f) => v.then(f), Promise.resolve(x));

export default pipeline;
