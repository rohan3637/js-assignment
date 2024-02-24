const News = require("../controllers/news");

module.exports = function (app) {
    app.route("/news").post(async (req, res, next) => {
        try {
            let params = req.body;
            await News.addNews(params);
            return res.status(201).json("News inserted successfully !!");
        } catch (err) {
            return next(err);
        }
    });

    app.route("/news/match").get(async (req, res, next) => {
        try {
            let params = req.query;
            let result = await News.getNewsByMatchId(params);
            return res.status(200).json(result);
        } catch (err) {
            return next(err);
        }
    });

    app.route("/news/tour").get(async (req, res, next) => {
        try {
            let params = req.query;
            let result = await News.getNewsByTourId(params);
            return res.status(200).json(result);
        } catch (err) {
            return next(err);
        }
    });

    app.route("/news/sport").get(async (req, res, next) => {
        try {
            let params = req.query;
            let result = await News.getNewsBySportId(params);
            return res.status(200).json(result);
        } catch (err) {
            return next(err);
        }
    });
};
