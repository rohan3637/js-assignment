const mysql = require("../lib/mysql");

const createNews = async (params) => {
    const { title, description, matchId, tourId } = params;
    const statement =
        "insert into news (title, description, matchId, tourId) VALUES (?, ?, ?, ?)";
    const parameters = [title, description, matchId, tourId];
    return await mysql.query(statement, parameters);
};

const findNewsByMatchId = async (params) => {
    const { matchId } = params;
    const statement =
        "select n.id as newsId, n.title as title, n.description as description " +
        "from news n where matchId = ?";
    const parameters = [matchId];
    return await mysql.query(statement, parameters);
};

const findNewsByTourId = async (params) => {
    const { tourId } = params;
    const statement =
        "select n.id as newsId, n.title as title, n.description as description " +
        "from news n " +
        "left join matches m ON n.matchId = m.id " +
        "where n.tourId = ? OR m.tourId = ?";
    const parameters = [tourId, tourId];
    return await mysql.query(statement, parameters);
};

const findNewsBySportId = async (params) => {
    const { sportId } = params;
    const statement =
        "select n.id as newsId, n.title as title, n.description as description " +
        "from news n " +
        "inner join tours ON n.tourId = tours.id " +
        "where tours.sportId = ?";
    const parameters = [sportId];
    return await mysql.query(statement, parameters);
};

module.exports = {
    createNews: createNews,
    findNewsByMatchId: findNewsByMatchId,
    findNewsByTourId: findNewsByTourId,
    findNewsBySportId: findNewsBySportId,
};
