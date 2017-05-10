var express = require('express');
var bodyParser = require('body-parser');
var cookieSession = require('cookie-session');
var methodOverride = require('method-override');
var serveStatic = require('serve-static')
var config = require('config');
var middleware = require('./middleware');
var router = require('./router');
var app = express();
var port = config.get('express.port');
app.use(bodyParser.json({ type: 'application/*+json' }))
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }))
app.use(bodyParser.text({ type: 'text/html' }))
app.use(cookieSession({
    name: 'session',
    keys: ['demo@qq.com'],
    maxAge: 24 * 60 * 60 * 1000
}));
app.use(methodOverride());
middleware(app);
router(app);
app.listen(port || 3001, function() {
    console.log('server is starting');
});
