import { describe, expect, test } from "vitest";
import { getAPIKey } from "../api/auth.js";

describe("getAPIKey", () => {
  test("returns null when authorization header is missing", () => {
    const headers = {};
    expect(getAPIKey(headers)).toBeNull();
  });

  test("returns null when scheme is not ApiKey", () => {
    const headers = { authorization: "Bearer secret123" };
    expect(getAPIKey(headers)).toBeNull();
  });

  test("returns null when ApiKey value is missing", () => {
    const headers = { authorization: "ApiKey" };
    expect(getAPIKey(headers)).toBeNull();
  });

  test("returns API key when authorization header is valid", () => {
    const headers = { authorization: "ApiKey my-secret-key" };
    expect(getAPIKey(headers)).toBe("my-secret-key");
  });

  test("is case-sensitive for ApiKey scheme", () => {
    const headers = { authorization: "apikey my-secret-key" };
    expect(getAPIKey(headers)).toBeNull();
  });
});
