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

/**
 * This method allows you to pass more arguments through the pipeline via a closure
 *
 * @param func - The method you want to run in the pipeline
 * @param {...any} args - the closure args you want to use in the method
 */
function pipelineClosureMethod(func, ...args) {
  return async (x) => func(x, ...args);
}

export { pipeline, pipelineClosureMethod };
