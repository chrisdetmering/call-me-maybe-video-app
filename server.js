var AccessToken = require('twilio').jwt.AccessToken;
const express = require('express');
const bodyParser = require('body-parser');
var faker = require('faker');

const app = express();
const port = process.env.PORT || 5000;


var AccessToken = require('twilio').jwt.AccessToken;
var VideoGrant = AccessToken.VideoGrant;

// Substitute your Twilio AccountSid and ApiKey details

// Create an Access Token
var accessToken = new AccessToken(
  'ACf0403818be2b4a8868388f7419a3c3d4',
  'SKd1a4803b36c14c17f63a15fa4846a40f',
  'h8t2m8hhl0UHxEwi2nynsxEkAwmfRroR'
);
let identity = faker.name.findName()
// Set the Identity of this token
accessToken.identity = identity;

// Grant access to Video
var grant = new VideoGrant();
accessToken.addGrant(grant);

// Serialize the token as a JWT
var jwt = accessToken.toJwt();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/token', (req, res) => {
  res.send({ 
    identity: identity,
    token: jwt });
});


app.listen(port, () => console.log(`Listening on port ${port}`));