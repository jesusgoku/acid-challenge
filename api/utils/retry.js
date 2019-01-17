/**
 * Retry fn return promise and fail
 *
 * @param {Function} fn function returnin promise for retry in fail
 * @param {Number} maxRetries integer with max retries if fail promise
 * @param {Number} retriesDelay integer with milliseconds between retries
 */
export default async function retry(fn, maxRetries = 10, retriesDelay = 1000) {
  try {
    return await fn();
  } catch (err) {
    if (!maxRetries) {
      throw err;
    }

    await new Promise(resolve => setTimeout(resolve, retriesDelay));
    retry(fn, maxRetries - 1, retriesDelay);
  }
}
