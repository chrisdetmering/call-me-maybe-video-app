var AccessToken = require('twilio').jwt.AccessToken;
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;


var AccessToken = require('twilio').jwt.AccessToken;
var VideoGrant = AccessToken.VideoGrant;

// Substitute your Twilio AccountSid and ApiKey details
var ACCOUNT_SID = 'accountSid';
var API_KEY_SID = 'apiKeySid';
var API_KEY_SECRET = 'apiKeySecret';

// Create an Access Token
var accessToken = new AccessToken(
  'ACf0403818be2b4a8868388f7419a3c3d4',
  'SKd1a4803b36c14c17f63a15fa4846a40f',
  'h8t2m8hhl0UHxEwi2nynsxEkAwmfRroR'
);

// Set the Identity of this token
accessToken.identity = 'Chris Detmering';

// Grant access to Video
var grant = new VideoGrant();
grant.room = 'test';
accessToken.addGrant(grant);

// Serialize the token as a JWT
var jwt = accessToken.toJwt();



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/token', (req, res) => {
  res.send({ token: jwt });
});


app.listen(port, () => console.log(`Listening on port ${port}`));