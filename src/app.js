require('dotenv').config()
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
app.disable("x-powered-by");

// Require the routes
const usersRoutes = require("./routes/users.routes.js");
const postsRoutes = require("./routes/posts.routes.js");
const productsRoutes = require("./routes/products.routes.js");
const purchasesRoutes = require("./routes/purchases.routes.js");

//Request Logs
app.use(morgan((tokens, req, res) => {
    return ["method==>", tokens.method(req, res),
        "\nurl==>", tokens.url(req, res),
        "\nstatus==>", tokens.status(req, res),
        "\nres.content-length==>", tokens.res(req, res, "content-length"),
        "\nreq.headers.authorization==>", tokens.req(req, res, "authorization") || "Sin token",
        "\nres.response-time==>", tokens["response-time"](req, res), "ms"
    ].join(" ")
}))

// Enable cors
app.use(cors());

// Process json
app.use(express.json());

// Add routes
app.use("/users", usersRoutes);
app.use("/posts", postsRoutes);
app.use("/products", productsRoutes);
app.use("/purchases", purchasesRoutes);

// app.use('*', (_, res) => res.status(404).json({ code: 404, message: "Esta ruta no existe" }));
app.use((req, res, next) => {
    res.status(404).send("<h1>404</h1><h3>Route Not Found</h3>");
  });

module.exports = app;