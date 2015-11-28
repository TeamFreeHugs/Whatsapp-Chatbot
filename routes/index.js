var express = require('express');
var request = require('request');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.get('/getURL', function (req, res) {
    var url = require('url').parse(req.url, true);
    var reqURL = url.query.reqURL;
    var method = url.query.method || 'get';
    var id = url.query.lastID;
    request[method](reqURL, function (err, response, body) {
        res.status(200);
        res.header('Content-Type', 'text/plain');
        res.send(JSON.stringify({
            response: body,
            id: id
        }));
        res.end();
    });
});

module.exports = router;
