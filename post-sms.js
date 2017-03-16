module.exports = function(msg) {
    var http = require('http');
    var express = require('express');
    var twilio = require('twilio');
    var bodyParser = require('body-parser');
    var sendSms = require('./send-sms');
    var checkSyntax = require('./checkSyntax');
    var splitBody = require('./splitBody');

    var app = express();
    app.use(bodyParser.urlencoded({ extended: false }));

    //post sms to server
    app.post('/sms', function(req, res) {
        var twilio = require('twilio');
        var twiml = new twilio.TwimlResponse();

        // console.log(req.body.Body);
        console.log(req.body);
        //splitting the body part
        var splitting = splitBody(req.body.Body);

        //Phone number sms is sent from
        var from = req.body.From;

        //checking syntax
        var index = checkSyntax(req.body.Body);

        if (index == 0) {
            console.log('balance inquiry');
            console.log("Transfered Number : " + splitting[1]);
            //Function balance inquiry

            sendSms('balance inquiry', from);

        } else if (index == 1) {
            console.log('Transfer');
            console.log("Transfered Number : " + splitting[1]);
            //Function balance transfer

            sendSms('balance transfered', from);

        } else {
            console.log("invalid syntax");
            //Function error

            sendSms('invalid Syntax', from);
        }

        // twiml.message(msg);
        res.writeHead(200, { 'Content-Type': 'text/xml' });
        res.end(twiml.toString());
    });

    http.createServer(app).listen(1337, function() {
        console.log("Express server listening on port 1337");
    });


}