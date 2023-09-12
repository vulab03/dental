const routes = (app) => {
    app.use("/user", require("./user.router"));
    app.use("/admin", require("./admin.router"));
    app.use("/company", require("./company.router"));
    app.use("/post",require("./post.router"));
    app.use("/file",require("./file.router"));
    app.use("/id",require("./id.router"));
};

module.exports = routes;
