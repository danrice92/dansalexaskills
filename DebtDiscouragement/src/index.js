'use strict';

var AlexaSkill = require('./AlexaSkill'),
    answers = require('./answers');

var APP_ID = 'amzn1.ask.skill.44065039-014f-4846-9c81-c8718ad8c353';

var HowTo = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
HowTo.prototype = Object.create(AlexaSkill.prototype);
HowTo.prototype.constructor = HowTo;

HowTo.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    var speechText = "Welcome to Debt Discouragement, where I will try and help you be smart with your money by avoiding debt and interest. You can ask a question like, should I lease a new car? Now, what can I help you with?";
    // If the user either does not reply to the welcome message or says something that is not
    // understood, they will be prompted again with this text.
    var repromptText = "For instructions on what you can say, please say help me.";
    response.ask(speechText, repromptText);
};

HowTo.prototype.intentHandlers = {
    "DebtIntent": function (intent, session, response) {
        var debtSlot = intent.slots.Debt,
            debtName;
        if (debtSlot && debtSlot.value){
            debtName = debtSlot.value.toLowerCase();
        }

        var cardTitle = "Answer for " + debtName,
            answer = answers[debtName],
            speechOutput,
            repromptOutput;
        if (answer) {
            speechOutput = {
                speech: answer,
                type: AlexaSkill.speechOutputType.PLAIN_TEXT
            };
            response.tellWithCard(speechOutput, cardTitle, answer);
        } else {
            var speech;
            if (debtName) {
                speech = "I'm sorry, I currently do not know about " + debtName + ". What else can I help with?";
            } else {
                speech = "I'm sorry, I currently do not know about that type of debt. What else can I help with?";
            }
            speechOutput = {
                speech: speech,
                type: AlexaSkill.speechOutputType.PLAIN_TEXT
            };
            repromptOutput = {
                speech: "What else can I help with?",
                type: AlexaSkill.speechOutputType.PLAIN_TEXT
            };
            response.ask(speechOutput, repromptOutput);
        }
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        var speechText = "You can ask questions such as, what do you think of buying a TV with a credit card, or, you can say exit... Now, what can I help you with?";
        var repromptText = "You can say things like, what do you think of payday loans, or you can say exit... Now, what can I help you with?";
        var speechOutput = {
            speech: speechText,
            type: AlexaSkill.speechOutputType.PLAIN_TEXT
        };
        var repromptOutput = {
            speech: repromptText,
            type: AlexaSkill.speechOutputType.PLAIN_TEXT
        };
        response.ask(speechOutput, repromptOutput);
    }
};

exports.handler = function (event, context) {
    var howTo = new HowTo();
    howTo.execute(event, context);
};