module.exports = function(msg) {
    var http = require('http');
    var express = require('express');
    var twilio = require('twilio');
    var bodyParser = require('body-parser');

    var app = express();
    app.use(bodyParser.urlencoded({ extended: false }));


    app.post('/sms', function(req, res) {
        var twilio = require('twilio');
        var twiml = new twilio.TwimlResponse();
        console.log(req.body.Body);
        console.log(req.body.From);
        twiml.message(msg);
        res.writeHead(200, { 'Content-Type': 'text/xml' });
        res.end(twiml.toString());
    });

    http.createServer(app).listen(1337, function() {
        console.log("Express server listening on port 1337");
    });
}