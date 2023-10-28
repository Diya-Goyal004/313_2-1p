const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post('/subscribe', (req, res) => {
    const email = req.body.email;

    var api_key = 'key-9f58ce852b4363c729bfc3300ab43f7b';
    var domain = 'sandboxbd88e7b7526b4a7593a0d30d36298d50.mailgun.org';
    var mailgun = require('mailgun-js')({ apiKey: api_key, domain: domain });

    var data = {
        from: 'Diya Goyal <diyagoyal0104@gmail.com>',
        to: email,
        subject: 'Welcome to Our Newsletter!',
        text: 'Thank you for subscribing to our Newsletter! You are now part of our Deakin Community :)'
    };

    mailgun.messages().send(data, function (error, body) {
        if (error) {
            console.error('Error sending email:', error);
            res.status(500).send('Error sending email'); // Respond with an error if sending fails
        } else {
            console.log('Email sent:', body);
            // Send a success response to the client
            res.send('Thanks for subscribing!');
        }
    });
});

app.listen(3470, function (req, res) {
    console.log('Server is running at port 3470');
});
