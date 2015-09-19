
// requires
var koa = require('koa');
var route = require('koa-route');
var http = require('http');

// settings
var port = process.env.PORT || 7676;

// app
var app = koa();

// routes
app.use(route.get('/nodes', require('./routes/nodes_index.js')));

// listen
http.createServer(app.callback()).listen(port);
console.log('Koa listening on port: ' + port);
