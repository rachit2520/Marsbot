// Reference the packages we require so that we can use them in creating the bot
var restify = require('restify');
var builder = require('botbuilder');
// =========================================================
// Bot Setup
// =========================================================

// Setup Restify Server
// Listen for any activity on port 3978 of our local server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function() {
    console.log('%s listening to %s', server.name, server.url);
});
// Create chat bot
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});
var bot = new builder.UniversalBot(connector);

// If a Post request is made to /api/messages on port 3978 of our local server, then we pass it to the bot connector to handle
server.post('/api/messages', connector.listen());
// =========================================================
// Bots Dialogs 
// =========================================================
// This is called the root dialog. It is the first point of entry for any message the bot receives

// bot.dialog('/', function(session) {
//     // Send 'hello world' to the user
//     session.send("Hello World");
// });

var intentDialog = new builder.IntentDialog();

bot.dialog('/', intentDialog);

intentDialog.onDefault(builder.DialogAction.send('Sorry, I didn\'t understand that.'));

intentDialog.matches(/^Greeting/i, '/greetingDialog');
intentDialog.matches(/^Size/i, '/sizeDialog');
intentDialog.matches(/^Distance/i, '/distanceDialog');
intentDialog.matches(/^Life/i, '/lifeDialog');

bot.dialog('/greetingDialog',
    function(session) {
        session.endDialog('Hi! I\'m a droid from Mars. Ask me questions you have about Mars!');
    }
)

bot.dialog('/sizeDialog',
    function(session) {
        session.endDialog('Mars has a radius of 3,390km, compared to Earth\'s radius which is 6,371km');
    }
)

bot.dialog('/distanceDialog',
    function(session) {
        session.endDialog('Mars is pretty far away from your home planet, Earth. On average, the distance is 225 million km.');
    }
)

bot.dialog('/lifeDialog',
    function(session) {
        session.endDialog('Yes, there is life on Mars although not yet discovered by primitive humans.');
    }
)