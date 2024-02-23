const request = require("supertest");
const { app } = require("../../index");
const Tour = require("../../tour"); // Assuming you have the Tour module implemented

// Mock cache module
const cache = {
  get: jest.fn(),
  set: jest.fn(),
};

jest.mock("../../cache", () => cache);

describe("Integration Tests", () => {
  beforeEach(() => {
    // Clear mock function calls before each test
    cache.get.mockClear();
    cache.set.mockClear();
  });

  it("should return cached data if available", async () => {
    // Mock cached result
    const cachedResult = [
      {
        /* Sample cached data */
      },
    ];
    cache.get.mockReturnValueOnce(cachedResult);

    const response = await request(app).get("/tour/matches");

    // Expect response status code to be 200
    expect(response.status).toBe(200);
    // Expect response body to match cached data
    expect(response.body).toEqual(cachedResult);
    // Ensure database query is not called
    expect(mysql.query).not.toHaveBeenCalled();
  });

  it("should fetch data from database if not available in cache", async () => {
    // Mock database result
    const dbResult = [
      {
        /* Sample database data */
      },
    ];
    mysql.query.mockResolvedValueOnce(dbResult);

    const response = await request(app).get("/tour/matches");

    // Expect response status code to be 200
    expect(response.status).toBe(200);
    // Expect response body to match database result
    expect(response.body).toEqual(dbResult);
    // Ensure cache set is called with the correct parameters
    expect(cache.set).toHaveBeenCalledWith(expect.any(String), dbResult, 600);
  });

  // Add more test cases as needed to cover other scenarios
});
