const News = require("../models/news");

const addNews = async (params) => {
    const { title, description, matchId, tourId } = params;
    if (!title || !description) {
        throw new Error("Missing required fields !!");
    }
    return await News.createNews(params);
};

const getNewsByMatchId = async (params) => {
    const matchId = params.matchId || null;
    if (!matchId) {
        throw new Error("Missing required query parameter: matchId !!");
    }
    return await News.findNewsByMatchId(params);
};

const getNewsByTourId = async (params) => {
    const tourId = params.tourId || null;
    if (!tourId) {
        throw new Error("Missing required query parameter: tourId !!");
    }
    return await News.findNewsByTourId(params);
};

const getNewsBySportId = async (params) => {
    const sportId = params.sportId || null;
    if (sportId == null) {
        throw new Error("Missing required query parameter: sportId !!");
    }
    return await News.findNewsBySportId(params);
};

module.exports = {
    addNews: addNews,
    getNewsByMatchId: getNewsByMatchId,
    getNewsByTourId: getNewsByTourId,
    getNewsBySportId: getNewsBySportId,
};
