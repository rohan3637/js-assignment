const News = require("../models/news");

const addNews = async (params) => {
    const { title, description, matchId, tourId } = params;
    if (!title || !description) {
        return new Error("Missing required fields !!");
    }
    return await News.createNews(params);
};

const getNewsByMatchId = async (params) => {
    const { matchId } = params.matchId;
    if (!matchId) {
        return new Error("Missing required query parameter: matchId !!");
    }
    return await News.findNewsByMatchId(params);
};

const getNewsByTourId = async (params) => {
    const { tourId } = params.tourId;
    if (!tourId) {
        return new Error("Missing required query parameter: tourId !!");
    }
    return await News.findNewsByTourId(params);
};

const getNewsBySportId = async (params) => {
    const { sportId } = params.sportId;
    if (!sportId) {
        return new Error("Missing required query parameter: sportId !!");
    }
    return await News.findNewsBySportId(params);
};

module.exports = {
    addNews: addNews,
    getNewsByMatchId: getNewsByMatchId,
    getNewsByTourId: getNewsByTourId,
    getNewsBySportId: getNewsBySportId,
};
