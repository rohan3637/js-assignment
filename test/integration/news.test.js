const request = require("supertest");
const express = require("express");

const newsRoutes = require("../../src/routes/news");
const News = require("../../src/models/news");
jest.mock("../../src/lib/mysql", () => ({
    query: jest.fn(),
}));

describe("News Routes", () => {
    let app;

    beforeAll(() => {
        app = express();
        app.use(express.json());
        newsRoutes(app);
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe("POST /news", () => {
        it("should add news successfully", async () => {
            const newsData = {
                title: "Sample News Title",
                description: "Sample News Description",
                tourId: 2,
                matchId: null,
            };

            jest.spyOn(News, "createNews").mockResolvedValueOnce();

            await request(app)
                .post("/news")
                .send(newsData)
                .expect(201)
                .expect('"News inserted successfully !!"');

            expect(News.createNews).toHaveBeenCalledWith(newsData);
        });
    });

    describe("GET /news/match", () => {
        it("should get news by match ID successfully", async () => {
            const matchId = 123;
            const mockResult = [
                {
                    newsId: 1,
                    title: "Sample News Title",
                    description: "Sample News Description",
                },
            ];

            jest.spyOn(News, "findNewsByMatchId").mockResolvedValueOnce(
                mockResult
            );

            await request(app)
                .get("/news/match")
                .query({ matchId })
                .expect(200)
                .expect("Content-Type", /json/)
                .expect(mockResult);

            expect(News.findNewsByMatchId).toHaveBeenCalledWith({
                matchId: matchId.toString(),
            });
        });
    });

    describe("GET /news/tour", () => {
        it("should get news by tour ID successfully", async () => {
            const tourId = 456;
            const mockResult = [
                {
                    newsId: 1,
                    title: "Sample News Title",
                    description: "Sample News Description",
                },
            ];

            jest.spyOn(News, "findNewsByTourId").mockResolvedValueOnce(
                mockResult
            );

            await request(app)
                .get("/news/tour")
                .query({ tourId })
                .expect(200)
                .expect("Content-Type", /json/)
                .expect(mockResult);

            expect(News.findNewsByTourId).toHaveBeenCalledWith({
                tourId: tourId.toString(),
            });
        });
    });

    describe("GET /news/sport", () => {
        it("should get news by sport ID successfully", async () => {
            const sportId = 789;
            const mockResult = [
                {
                    newsId: 1,
                    title: "Sample News Title",
                    description: "Sample News Description",
                },
            ];

            jest.spyOn(News, "findNewsBySportId").mockResolvedValueOnce(
                mockResult
            );

            await request(app)
                .get("/news/sport")
                .query({ sportId })
                .expect(200)
                .expect("Content-Type", /json/)
                .expect(mockResult);

            expect(News.findNewsBySportId).toHaveBeenCalledWith({
                sportId: sportId.toString(),
            });
        });
    });
});
