
// requires
var koa = require('koa');
var route = require('koa-route');
var http = require('http');

// settings
var port = process.env.PORT || 7676;

// app
var app = koa();

// middleware
app.use(require('koa-body')());

// routes
app.use(route.get('/nodes', require('./routes/nodes_index.js')));
app.use(route.post('/nodes', require('./routes/nodes_post.js')));
app.use(route.delete('/nodes', require('./routes/nodes_delete.js')));

// listen
http.createServer(app.callback()).listen(port);
console.log('Koa listening on port: ' + port);

// export for unit tests
module.exports = app;
