const crypto = require("crypto");

const {deterministicPartitionKey, MAX_PARTITION_KEY_LENGTH, TRIVIAL_PARTITION_KEY, HASH_ALGORYTHM} = require("./dpk");

describe("deterministicPartitionKey", () => {
  it(`Returns the literal '${TRIVIAL_PARTITION_KEY}' when given event is falsy`, () => {
    expect(deterministicPartitionKey()).toBe(TRIVIAL_PARTITION_KEY);
    expect(deterministicPartitionKey(null)).toBe(TRIVIAL_PARTITION_KEY);
    expect(deterministicPartitionKey(undefined)).toBe(TRIVIAL_PARTITION_KEY);
    expect(deterministicPartitionKey(false)).toBe(TRIVIAL_PARTITION_KEY);
  });

  test("Should return event's partition key when it exists", () => {
    const event = {partitionKey: "customKey"};
    const result = deterministicPartitionKey(event);
    expect(result).toBe("customKey");
  });

  test("Should return hashed event data when partition key is not provided", () => {
    const event = {someData: "example"};
    const dataHash = crypto.createHash(HASH_ALGORYTHM).update(JSON.stringify(event)).digest("hex");
    const result = deterministicPartitionKey(event);
    expect(result).toBe(dataHash);
  });

  test("Should return hashed partition key when candidate exceeds max length", () => {
    const longKey = "a".repeat(MAX_PARTITION_KEY_LENGTH + 1);
    const keyHash = crypto.createHash(HASH_ALGORYTHM).update(longKey).digest("hex");
    const event = {partitionKey: longKey};
    const result = deterministicPartitionKey(event);
    expect(result).toBe(keyHash);
  });
});
