/**
 * Method to handle sequential tasks that rely on the output of the previous task
 *
 * @param {Array.<Function>} fns The functions you would like to run over the input
 * @memberof module:Utilities
 * @returns {any} The result of the pipeline processing
 */
const pipeline = (...fns) => (x) => fns.reduce((v, f) => v.then(f), Promise.resolve(x));

/**
 * This method allows you to pass more arguments through the pipeline via a closure
 *
 * @param {Function} func The method you want to run in the pipeline
 * @param {...any} args The closure args you want to use in the method
 * @memberof module:Utilities
 * @returns {Function} A method to be called with a new argumnet as well
 *  as those captured in the closure
 */
function pipelineClosureMethod(func, ...args) {
  return async (x) => func(x, ...args);
}

/**
 * Method to handle sequential tasks that all act on the same value, short circuiting when
 * one returns true
 *
 * @param {Array.<Function>} fns Array of functions to run over single value
 * @returns {void} Nothing
 */
const shortCircuitPipeline = (...fns) => (val) => fns.reduce(
  async (current, fn) => current.then((value) => value || fn(val)),
  Promise.resolve(false),
);

export { pipeline, pipelineClosureMethod, shortCircuitPipeline };
