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
        var breakOp = text.split(" ");

        // console.log("#########################");
        // console.log(breakOp[0]);
        // console.log(breakOp[1]);


        var operations = breakOp[0];
        var safeNumber = breakOp[1];


        if (operations == 'BI') {
            console.log('balance inquiry');
            console.log("Transfered Number : " + safeNumber);
            //Function balance inquiry

            sendSms('balance inquiry', from);


        } else if (operations == 'TR') {
            console.log('Transfer');
            console.log("Transfered Number : " + safeNumber);
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