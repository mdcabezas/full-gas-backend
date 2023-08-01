const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();

// Require the routes
const usersRoutes = require('./routes/users.routes.js');
const postsRoutes = require('./routes/posts.routes.js');


//Request Logs
app.use(morgan((tokens, req, res) => {
    return ['method==>', tokens.method(req, res),
        '\nurl==>', tokens.url(req, res),
        '\nstatus==>', tokens.status(req, res),
        '\nres.content-length==>', tokens.res(req, res, 'content-length'),
        '\nreq.headers.authorization==>', tokens.req(req, res, 'authorization') || 'Sin token',
        '\nres.response-time==>', tokens['response-time'](req, res), 'ms'
    ].join(' ')
}))

// Enable cors
app.use(cors());

// Process json
app.use(express.json())

// Add routes
app.use('/', usersRoutes);
app.use('/posts', postsRoutes);

module.exports = app;