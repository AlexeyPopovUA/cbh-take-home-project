const crypto = require("crypto");

const {deterministicPartitionKey} = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  test("Should return trivial partition key when event is falsy", () => {
    expect(deterministicPartitionKey(null)).toBe("0");
    expect(deterministicPartitionKey(undefined)).toBe("0");
    expect(deterministicPartitionKey(false)).toBe("0");
  });

  test("Should return event's partition key when it exists", () => {
    const event = {partitionKey: "customKey"};
    const result = deterministicPartitionKey(event);
    expect(result).toBe("customKey");
  });

  test("Should return hashed event data when partition key is not provided", () => {
    const event = {someData: "example"};
    const dataHash = crypto.createHash("sha3-512").update(JSON.stringify(event)).digest("hex");
    const result = deterministicPartitionKey(event);
    expect(result).toBe(dataHash);
  });

  test("Should return hashed partition key when candidate exceeds max length", () => {
    const longKey = "a".repeat(257);
    const keyHash = crypto.createHash("sha3-512").update(longKey).digest("hex");
    const event = {partitionKey: longKey};
    const result = deterministicPartitionKey(event);
    expect(result).toBe(keyHash);
  });
});
