require('dotenv').config()
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const path = require('path');
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

// Static files
app.use(express.static(path.join(__dirname, "public")));

// Add routes
app.use("/", usersRoutes);
app.use("/posts", postsRoutes);
app.use("/products", productsRoutes);
app.use("/purchases", purchasesRoutes);

app.use('*', (_, res) => res.status(404).json({ code: 404, message: "Esta ruta no existe" }));

module.exports = app;