const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post(
        "/api/user/signin", [
    ],
        controller.Signin
    );
    app.post(
        "/api/user/create", [
        authJwt.checkDuplicateEmail,
    ],
        controller.CreateUser
    );
    app.get("/api/user/findall", [authJwt.verifyToken], controller.FindAll);
    app.post(
        "/api/user/findone",
        [authJwt.verifyToken],
        controller.FindOne
    );
    app.post("/api/user/delete", [authJwt.verifyToken], controller.Destroyed);
}