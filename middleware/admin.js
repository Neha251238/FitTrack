module.exports = function (req, res, next) {

    if (!req.session || !req.session.userId) {
        return res.redirect("/login");
    }

    if (req.session.role !== "admin") {
        return res.status(403).send("Access Denied");
    }

    next();
};