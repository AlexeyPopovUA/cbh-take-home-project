const crypto = require("crypto");

exports.MAX_PARTITION_KEY_LENGTH = 256;
exports.HASH_ALGORYTHM = "sha3-512";
exports.TRIVIAL_PARTITION_KEY = "0";

/**
 * Produces a hash by given input
 *
 * @param data {string} - data for the hash string
 * @returns {string}
 */
const createHashedKey = data => crypto.createHash(this.HASH_ALGORYTHM).update(data).digest("hex");

/**
 * Ensures that the key string has a correct format
 *
 * @param key {unknown} - input data of unknown type
 * @returns {string}
 */
const ensureKeyFormat = key => {
  let result = key;

  if (typeof result !== "string") {
    result = JSON.stringify(result);
  }

  return result.length > this.MAX_PARTITION_KEY_LENGTH ? createHashedKey(result) : result;
};

/**
 * Ensures producing the deterministic partition key by the optional input event
 *
 * @param event {{partitionKey?: string}?}
 * @returns {string}
 */
exports.deterministicPartitionKey = (event) => {
  // falsy event case
  if (!event) {
    return this.TRIVIAL_PARTITION_KEY;

  // partition key is set
  } else if (event.partitionKey) {
    return ensureKeyFormat(event.partitionKey);

  // partition key is not set
  } else {
    return createHashedKey(JSON.stringify(event));
  }
};
