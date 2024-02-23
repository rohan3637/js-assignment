const Sport = require("../controllers/sport");

module.exports = function (app) {
    app.route("/sport/tour/match").get(async (req, res, next) => {
        try {
            const data = await Sport.getAllSportsToursAndMatches();
            console.log(data);
            return res.json(await Sport.getAllSportsToursAndMatches());
        } catch (err) {
            return next(err);
        }
    });
};
