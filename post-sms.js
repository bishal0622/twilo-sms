module.exports = function(msg) {
    var http = require('http');
    var express = require('express');
    var twilio = require('twilio');
    var bodyParser = require('body-parser');
    var sendSms = require('./send-sms');


    var app = express();
    app.use(bodyParser.urlencoded({ extended: false }));


    app.post('/sms', function(req, res) {
        var twilio = require('twilio');
        var twiml = new twilio.TwimlResponse();

        // // console.log(req.body.Body);
        console.log(req.body);
        var from = req.body.From;

        var text = req.body.Body;
        var operations = text.substring(0, 2);

        if (operations == 'BI') {
            console.log('balance inquiry');
            //Function balance inquiry

            sendSms('balance inquiry', from);


        } else if (operations == 'tra') {
            console.log('Transfer');
            //Function balance transfer

            sendSms('balance transfered', from);

        } else {
            console.log("invalid syntax");
            //Function error

            sendSms('invalid Syntax', from);
        }

        var transferNumber = text.substring(4, 14);

        // console.log("Full Message : " + text);
        // console.log("Operations : " + operations);
        console.log("Transfered Number : " + transferNumber);

        twiml.message(msg);
        res.writeHead(200, { 'Content-Type': 'text/xml' });
        res.end(twiml.toString());
    });

    http.createServer(app).listen(1337, function() {
        console.log("Express server listening on port 1337");
    });


}