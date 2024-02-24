const mysql = require("../lib/mysql");

const createNews = async (params) => {
    const { title, description, matchId, tourId } = params;
    const statement =
        "INSERT INTO mydb.news (title, description, matchId, tourId) VALUES (?, ?, ?, ?)";
    const parameters = [title, description, matchId, tourId];
    return await mysql.query(statement, parameters);
};

const getNewsByMatchId = async (params) => {
    const { matchId } = params;
    const statement =
        "select n.id as newsId, n.title as title, n.description as description " +
        "from news n where matchId = ?";
    const parameters = [matchId];
    return await mysql.query(statement, parameters);
};

const getNewsByTourId = async (params) => {
    const { tourId } = params;
    const statement = `
        SELECT n.id as newsId, n.title as title, n.description as description
        FROM news n
        LEFT JOIN matches m ON n.matchId = m.id
        WHERE n.tourId = ? OR m.tourId = ?;
    `;
    const parameters = [tourId, tourId];
    return await mysql.query(statement, parameters);
};

const getNewsBySportId = async (params) => {
    const { sportId } = params;
    const statement =
        "SELECT n.id as newsId, n.title as title, n.description as description " +
        "FROM news n " +
        "INNER JOIN tours ON news.tourId = tours.id " +
        "WHERE tours.sportId = ?";
    const parameters = [sportId];
    return await mysql.query(statement, parameters);
};

module.exports = {
    createNews: createNews,
    getNewsByMatchId: getNewsByMatchId,
    getNewsByTourId: getNewsByTourId,
    getNewsBySportId: getNewsBySportId,
};
