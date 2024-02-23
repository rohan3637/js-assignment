const mysql = require("../lib/mysql");
const NodeCache = require("node-cache");
const cache = new NodeCache();

const getAllTours = async () => {
  const statement = "select * from tours;";
  const parameters = [];
  return await mysql.query(statement, parameters);
};

const getMatchesByTourName = async (params) => {
  const statement =
    "select * from matches left join tours on matches.tourId = tours.id where tours.name = ?";
  const parameters = [params.name];

  const cacheKey = JSON.stringify(parameters);
  const cachedResult = cache.get(cacheKey);
  if (cachedResult) {
    console.log("comming from cache");
    return cachedResult;
  } else {
    const result = await mysql.query(statement, parameters);
    console.log("coming from DB");
    cache.set(cacheKey, result, 600);
    return result;
  }
};

module.exports = {
  getAllTours: getAllTours,
  getMatchesByTourName: getMatchesByTourName,
};
