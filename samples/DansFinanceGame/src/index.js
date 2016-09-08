/**
 Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

 http://aws.amazon.com/apache2.0/

 or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 */

/**
 * This sample shows how to create a simple Trivia skill with a multiple choice format. The skill
 * supports 1 player at a time, and does not support games across sessions.
 */

'use strict';

/**
 * When editing your questions pay attention to your punctuation. Make sure you use question marks or periods.
 * Make sure the first answer is the correct one. Set at least 4 answers, any extras will be shuffled in.
 */
var questions = [
    {
        "In 2014, how much student loan debt was held in total in the United States?": [
            "One point two trillion dollars",
            "One hundred billion dollars",
            "One billion dollars",
            "Five hundred billion dollars",
            "Nine hundred billion dollars"
        ]
    },
    {
        "How much credit card debt was held in the United States in 2012?": [
            "Seven hundred ninety-eight point five billion dollars",
            "Eight hundred one billion dollars",
            "Nine billion dollars",
            "One hundred five billion dollars"
        ]
    },
    {
        "On average, how much debt did the average college graduate leave school with in the year twenty fifteen?": [
            "Thirty-five thousand dollars",
            "Ten thousand dollars",
            "Sixteen thousand five hundred dollars",
            "Twenty thousand dollars"
        ]
    },
    {
        "Which of these college majors, on average, results in the highest annual salary after graduation?": [
            "Engineering",
            "Business",
            "Healthcare",
            "Education"
        ]
    },
    {
        "How much of its value does a brand new car lose the moment you drive it off the lot, on average?": [
            "Eleven percent",
            "One percent",
            "Eight percent",
            "Fifty percent"
        ]
    },
    {
        "How much of its value has a brand new car lost after five years of ownership, on average?": [
            "Sixty-three percent",
            "Fifty percent",
            "Twenty percent",
            "Forty-six percent"
        ]
    },
    {
        "Which of these has the smallest impact on your credit score?": [
            "The number of credit accounts you have",
            "Derogatory marks on your credit report",
            "Your on-time payment history",
            "The age of your credit history"
        ]
    },
    {
        "If you want a good credit score, it is better to have:": [
            "Low credit balances on your credit cards",
            "High credit balances on your credit cards",
            "Only one credit card",
            "No credit cards"
        ]
    },
    {
        "Which of these is not a credit reporting agency?": [
            "Citi",
            "TransUnion",
            "Equifax",
            "Experian"
        ]
    },
    {
        "How long can bankruptcy stay on your credit history?": [
            "Ten years",
            "Five years",
            "Three years",
            "Six months"
        ]
    },
    {
        "If you leave college with thirty thousand dollars of debt and pay it back over ten years with a seven percent interest rate, how much will you ultimately pay?": [
            "Over forty-one thousand dollars",
            "Thirty thousand dollars",
            "About thirty-five thousand dollars",
            "About thirty-two thousand dollars"
        ]
    },
    {
        "What percentage of frequent flyer miles earned from credit card rewards are never redeemed?": [
            "Seventy-eight percent",
            "Fifty percent",
            "Twenty-five percent",
            "Forty percent"
        ]
    },
    {
        "Statistically, are you likely to spend more money if you pay for things with cash or with a card?": [
            "Card",
            "Cash",
            "Check",
            "There is no difference"
        ]
    },
    {
        "What is the lowest possible credit score?": [
            "Three hundred",
            "Three hundred twenty-five",
            "Zero",
            "Two hundred"
        ]
    },
    {
        "What is the highest possible credit score?": [
            "Eight hundred fifty",
            "Seven hundred",
            "Eight hundred",
            "One thousand"
        ]
    },
    {
        "A hotel room can only be paid for with a credit card.": [
            "False, it can also be paid for with a debit card",
            "True, it can only be paid for with a credit card",
            "False, all hotels accept cash",
            "False, you can pay with cash over the phone"
        ]
    },
    {
        "Who was it who said, many people, if not most, would bestir themselves very little were it not for the pressure of debt obligations. If so, they are not free men and will not work from free motives. The debt motive is, basically, a slave motive?": [
            "Henry Ford",
            "George Washington",
            "Alexander Hamilton",
            "Kevin Bacon"
        ]
    },
    {
        "It is possible to pay for a house in full upfront and not get a mortgage.": [
            "True",
            "False",
            "It depends on your credit score",
            "It depends"
        ]
    },
    {
        "On average, is it most expensive to lease a new car, finance a new car, or finance a used car after the lease or loan has been fully paid for?": [
            "Lease",
            "Finance new",
            "Finance used",
            "They are all about the same"
        ]
    },
    {
        "If you are leasing a car, do you legally own the car?": [
            "No",
            "Yes",
            "It depends on the lease",
            "It depends on the judge you get"
        ]
    },
    {
        "It is possible to purchase both new and used cars without getting a loan or lease.": [
            "True",
            "False",
            "It depends on the car company",
            "You can buy used cars but you have to finance new cars"
        ]
    },
    {
        "Statistically, which of these do most people typically do with their finances when they get a pay raise?": [
            "Increase their spending",
            "Decrease their spending",
            "Spend about the same as they did before",
            "Quit their job"
        ]
    },
    {
        "On average, how much more does a college graduate with a Bachelor's Degree make during their time in the workforce than a high school graduate?": [
            "A million dollars more",
            "One hundred thousand dollars more",
            "Fifty million dollars more",
            "They don't, they actually make less than high school graduates"
        ]
    },
    {
        "According to a study from Princeton University, there is a correlation between money and happiness at low to middle income levels. At what income level did money no longer have any clear correlation with happiness in the study?": [
            "Seventy-five thousand dollars a year",
            "Thirty thousand dollars a year",
            "Two hundred fifty thousand dollars a year",
            "People were very happy working for minimum wage."
        ]
    },
    {
        "What is the federal minimum wage in the United States as of the year twenty sixteen?": [
            "Seven twenty-five an hour",
            "Eight thirty-one an hour",
            "Fifteen dollars an hour",
            "Twelve dollars an hour"
        ]
    },
    {
        "Some states have different minimum wages than the federal minimum wage. Which of these states is tied with California for the highest minimum wage rate, ten dollars an hour, as of twenty sixteen?": [
            "Massachusetts",
            "Washington",
            "Wyoming",
            "Illinois"
        ]
    },
    {
        "All credit scores are calculated using the FICO scoring model.": [
            "False",
            "True",
            "True, but only during leap years",
            "True if you are under twenty-five"
        ]
    },
    {
        "What percentage of adults in the United States have no savings outside of funds in a retirement plan?": [
            "Thirty-nine percent",
            "Fifty percent",
            "Twelve percent",
            "Everyone has a savings account"
        ]
    },
    {
        "How much more in interest will you pay over the life of a mortgage if you get a thirty-year loan than if you get a fifteen-year loan?": [
            "More than twice as much",
            "Fifty percent more",
            "Thirty-three percent more",
            "Fifty times more"
        ]
    },
    {
        "First-time home buyers can qualify for a lower down payment on their home as low as:": [
            "Three point five percent",
            "Ten percent",
            "Twelve point two five percent",
            "Twenty percent"
        ]
    },
    {
        "Which of these types of debt are you still liable for if you declare bankruptcy?": [
            "Student loans",
            "Credit cards",
            "Car loans",
            "Personal loans"
        ]
    },
    {
        "If you declare bankruptcy, which of these things is true?": [
            "All of these things",
            "You may need to give up your house",
            "You may need to give up your car",
            "You will still have to pay for expenses you recently accrued",
            "You are still responsible for alimony and child support"
        ]
    }
];

// Route the incoming request based on type (LaunchRequest, IntentRequest,
// etc.) The JSON body of the request is provided in the event parameter.
exports.handler = function (event, context) {
    try {
        console.log("event.session.application.applicationId=" + event.session.application.applicationId);

        /**
         * Uncomment this if statement and populate with your skill's application ID to
         * prevent someone else from configuring a skill that sends requests to this function.
         */

//     if (event.session.application.applicationId !== "amzn1.echo-sdk-ams.app.05aecccb3-1461-48fb-a008-822ddrt6b516") {
//         context.fail("Invalid Application ID");
//      }

        if (event.session.new) {
            onSessionStarted({requestId: event.request.requestId}, event.session);
        }

        if (event.request.type === "LaunchRequest") {
            onLaunch(event.request,
                event.session,
                function callback(sessionAttributes, speechletResponse) {
                    context.succeed(buildResponse(sessionAttributes, speechletResponse));
                });
        } else if (event.request.type === "IntentRequest") {
            onIntent(event.request,
                event.session,
                function callback(sessionAttributes, speechletResponse) {
                    context.succeed(buildResponse(sessionAttributes, speechletResponse));
                });
        } else if (event.request.type === "SessionEndedRequest") {
            onSessionEnded(event.request, event.session);
            context.succeed();
        }
    } catch (e) {
        context.fail("Exception: " + e);
    }
};

/**
 * Called when the session starts.
 */
function onSessionStarted(sessionStartedRequest, session) {
    console.log("onSessionStarted requestId=" + sessionStartedRequest.requestId
        + ", sessionId=" + session.sessionId);

    // add any session init logic here
}

/**
 * Called when the user invokes the skill without specifying what they want.
 */
function onLaunch(launchRequest, session, callback) {
    console.log("onLaunch requestId=" + launchRequest.requestId
        + ", sessionId=" + session.sessionId);

    getWelcomeResponse(callback);
}

/**
 * Called when the user specifies an intent for this skill.
 */
function onIntent(intentRequest, session, callback) {
    console.log("onIntent requestId=" + intentRequest.requestId
        + ", sessionId=" + session.sessionId);

    var intent = intentRequest.intent,
        intentName = intentRequest.intent.name;

    // handle yes/no intent after the user has been prompted
    if (session.attributes && session.attributes.userPromptedToContinue) {
        delete session.attributes.userPromptedToContinue;
        if ("AMAZON.NoIntent" === intentName) {
            handleFinishSessionRequest(intent, session, callback);
        } else if ("AMAZON.YesIntent" === intentName) {
            handleRepeatRequest(intent, session, callback);
        }
    }

    // dispatch custom intents to handlers here
    if ("AnswerIntent" === intentName) {
        handleAnswerRequest(intent, session, callback);
    } else if ("AnswerOnlyIntent" === intentName) {
        handleAnswerRequest(intent, session, callback);
    } else if ("DontKnowIntent" === intentName) {
        handleAnswerRequest(intent, session, callback);
    } else if ("AMAZON.YesIntent" === intentName) {
        handleAnswerRequest(intent, session, callback);
    } else if ("AMAZON.NoIntent" === intentName) {
        handleAnswerRequest(intent, session, callback);
    } else if ("AMAZON.StartOverIntent" === intentName) {
        getWelcomeResponse(callback);
    } else if ("AMAZON.RepeatIntent" === intentName) {
        handleRepeatRequest(intent, session, callback);
    } else if ("AMAZON.HelpIntent" === intentName) {
        handleGetHelpRequest(intent, session, callback);
    } else if ("AMAZON.StopIntent" === intentName) {
        handleFinishSessionRequest(intent, session, callback);
    } else if ("AMAZON.CancelIntent" === intentName) {
        handleFinishSessionRequest(intent, session, callback);
    } else {
        throw "Invalid intent";
    }
}

/**
 * Called when the user ends the session.
 * Is not called when the skill returns shouldEndSession=true.
 */
function onSessionEnded(sessionEndedRequest, session) {
    console.log("onSessionEnded requestId=" + sessionEndedRequest.requestId
        + ", sessionId=" + session.sessionId);

    // Add any cleanup logic here
}

// ------- Skill specific business logic -------

var ANSWER_COUNT = 4;
var GAME_LENGTH = 5;
var CARD_TITLE = "Trivia"; // Be sure to change this for your skill.

function getWelcomeResponse(callback) {
    var sessionAttributes = {},
        speechOutput = "I will ask you " + GAME_LENGTH.toString()
            + " questions, try to get as many right as you can. Just say the number of the answer. Let's begin. ",
        shouldEndSession = false,

        gameQuestions = populateGameQuestions(),
        correctAnswerIndex = Math.floor(Math.random() * (ANSWER_COUNT)), // Generate a random index for the correct answer, from 0 to 3
        roundAnswers = populateRoundAnswers(gameQuestions, 0, correctAnswerIndex),

        currentQuestionIndex = 0,
        spokenQuestion = Object.keys(questions[gameQuestions[currentQuestionIndex]])[0],
        repromptText = "Question 1. " + spokenQuestion + " ",

        i, j;

    for (i = 0; i < ANSWER_COUNT; i++) {
        repromptText += (i+1).toString() + ". " + roundAnswers[i] + ". "
    }
    speechOutput += repromptText;
    sessionAttributes = {
        "speechOutput": repromptText,
        "repromptText": repromptText,
        "currentQuestionIndex": currentQuestionIndex,
        "correctAnswerIndex": correctAnswerIndex + 1,
        "questions": gameQuestions,
        "score": 0,
        "correctAnswerText":
            questions[gameQuestions[currentQuestionIndex]][Object.keys(questions[gameQuestions[currentQuestionIndex]])[0]][0]
    };
    callback(sessionAttributes,
        buildSpeechletResponse(CARD_TITLE, speechOutput, repromptText, shouldEndSession));
}

function populateGameQuestions() {
    var gameQuestions = [];
    var indexList = [];
    var index = questions.length;

    if (GAME_LENGTH > index){
        throw "Invalid Game Length.";
    }

    for (var i = 0; i < questions.length; i++){
        indexList.push(i);
    }

    // Pick GAME_LENGTH random questions from the list to ask the user, make sure there are no repeats.
    for (var j = 0; j < GAME_LENGTH; j++){
        var rand = Math.floor(Math.random() * index);
        index -= 1;

        var temp = indexList[index];
        indexList[index] = indexList[rand];
        indexList[rand] = temp;
        gameQuestions.push(indexList[index]);
    }

    return gameQuestions;
}

function populateRoundAnswers(gameQuestionIndexes, correctAnswerIndex, correctAnswerTargetLocation) {
    // Get the answers for a given question, and place the correct answer at the spot marked by the
    // correctAnswerTargetLocation variable. Note that you can have as many answers as you want but
    // only ANSWER_COUNT will be selected.
    var answers = [],
        answersCopy = questions[gameQuestionIndexes[correctAnswerIndex]][Object.keys(questions[gameQuestionIndexes[correctAnswerIndex]])[0]],
        temp, i;

    var index = answersCopy.length;

    if (index < ANSWER_COUNT){
        throw "Not enough answers for question.";
    }

    // Shuffle the answers, excluding the first element.
    for (var j = 1; j < answersCopy.length; j++){
        var rand = Math.floor(Math.random() * (index - 1)) + 1;
        index -= 1;

        var temp = answersCopy[index];
        answersCopy[index] = answersCopy[rand];
        answersCopy[rand] = temp;
    }

    // Swap the correct answer into the target location
    for (i = 0; i < ANSWER_COUNT; i++) {
        answers[i] = answersCopy[i];
    }
    temp = answers[0];
    answers[0] = answers[correctAnswerTargetLocation];
    answers[correctAnswerTargetLocation] = temp;
    return answers;
}

function handleAnswerRequest(intent, session, callback) {
    var speechOutput = "";
    var sessionAttributes = {};
    var gameInProgress = session.attributes && session.attributes.questions;
    var answerSlotValid = isAnswerSlotValid(intent);
    var userGaveUp = intent.name === "DontKnowIntent";

    if (!gameInProgress) {
        // If the user responded with an answer but there is no game in progress, ask the user
        // if they want to start a new game. Set a flag to track that we've prompted the user.
        sessionAttributes.userPromptedToContinue = true;
        speechOutput = "There is no game in progress. Do you want to start a new game? ";
        callback(sessionAttributes,
            buildSpeechletResponse(CARD_TITLE, speechOutput, speechOutput, false));
    } else if (!answerSlotValid && !userGaveUp) {
        // If the user provided answer isn't a number > 0 and < ANSWER_COUNT,
        // return an error message to the user. Remember to guide the user into providing correct values.
        var reprompt = session.attributes.speechOutput;
        var speechOutput = "Your answer must be a number between 1 and " + ANSWER_COUNT + ". " + reprompt;
        callback(session.attributes,
            buildSpeechletResponse(CARD_TITLE, speechOutput, reprompt, false));
    } else {
        var gameQuestions = session.attributes.questions,
            correctAnswerIndex = parseInt(session.attributes.correctAnswerIndex),
            currentScore = parseInt(session.attributes.score),
            currentQuestionIndex = parseInt(session.attributes.currentQuestionIndex),
            correctAnswerText = session.attributes.correctAnswerText;

        var speechOutputAnalysis = "";

        if (answerSlotValid && parseInt(intent.slots.Answer.value) == correctAnswerIndex) {
            currentScore++;
            speechOutputAnalysis = "correct. ";
        } else {
            if (!userGaveUp) {
                speechOutputAnalysis = "wrong. "
            }
            speechOutputAnalysis += "The correct answer is " + correctAnswerIndex + ": " + correctAnswerText + ". ";
        }
        // if currentQuestionIndex is 4, we've reached 5 questions (zero-indexed) and can exit the game session
        if (currentQuestionIndex == GAME_LENGTH - 1) {
            speechOutput = userGaveUp ? "" : "That answer is ";
            speechOutput += speechOutputAnalysis + "You got " + currentScore.toString() + " out of "
                + GAME_LENGTH.toString() + " questions correct. Thank you for playing!";
            callback(session.attributes,
                buildSpeechletResponse(CARD_TITLE, speechOutput, "", true));
        } else {
            currentQuestionIndex += 1;
            var spokenQuestion = Object.keys(questions[gameQuestions[currentQuestionIndex]])[0];
            // Generate a random index for the correct answer, from 0 to 3
            correctAnswerIndex = Math.floor(Math.random() * (ANSWER_COUNT));
            var roundAnswers = populateRoundAnswers(gameQuestions, currentQuestionIndex, correctAnswerIndex),

                questionIndexForSpeech = currentQuestionIndex + 1,
                repromptText = "Question " + questionIndexForSpeech.toString() + ". " + spokenQuestion + " ";
            for (var i = 0; i < ANSWER_COUNT; i++) {
                repromptText += (i+1).toString() + ". " + roundAnswers[i] + ". "
            }
            speechOutput += userGaveUp ? "" : "That answer is ";
            speechOutput += speechOutputAnalysis + "Your score is " + currentScore.toString() + ". " + repromptText;

            sessionAttributes = {
                "speechOutput": repromptText,
                "repromptText": repromptText,
                "currentQuestionIndex": currentQuestionIndex,
                "correctAnswerIndex": correctAnswerIndex + 1,
                "questions": gameQuestions,
                "score": currentScore,
                "correctAnswerText":
                    questions[gameQuestions[currentQuestionIndex]][Object.keys(questions[gameQuestions[currentQuestionIndex]])[0]][0]
            };
            callback(sessionAttributes,
                buildSpeechletResponse(CARD_TITLE, speechOutput, repromptText, false));
        }
    }
}

function handleRepeatRequest(intent, session, callback) {
    // Repeat the previous speechOutput and repromptText from the session attributes if available
    // else start a new game session
    if (!session.attributes || !session.attributes.speechOutput) {
        getWelcomeResponse(callback);
    } else {
        callback(session.attributes,
            buildSpeechletResponseWithoutCard(session.attributes.speechOutput, session.attributes.repromptText, false));
    }
}

function handleGetHelpRequest(intent, session, callback) {
    // Provide a help prompt for the user, explaining how the game is played. Then, continue the game
    // if there is one in progress, or provide the option to start another one.
    
    // Ensure that session.attributes has been initialized
    if (!session.attributes) {
        session.attributes = {};
    }

    // Set a flag to track that we're in the Help state.
    session.attributes.userPromptedToContinue = true;

    // Do not edit the help dialogue. This has been created by the Alexa team to demonstrate best practices.

    var speechOutput = "I will ask you " + GAME_LENGTH + " multiple choice questions. Respond with the number of the answer. "
        + "For example, say one, two, three, or four. To start a new game at any time, say, start game. "
        + "To repeat the last question, say, repeat. "
        + "Would you like to keep playing?",
        repromptText = "To give an answer to a question, respond with the number of the answer . "
        + "Would you like to keep playing?";
        var shouldEndSession = false;
    callback(session.attributes,
        buildSpeechletResponseWithoutCard(speechOutput, repromptText, shouldEndSession));
}

function handleFinishSessionRequest(intent, session, callback) {
    // End the session with a "Good bye!" if the user wants to quit the game
    callback(session.attributes,
        buildSpeechletResponseWithoutCard("Good bye!", "", true));
}

function isAnswerSlotValid(intent) {
    var answerSlotFilled = intent.slots && intent.slots.Answer && intent.slots.Answer.value;
    var answerSlotIsInt = answerSlotFilled && !isNaN(parseInt(intent.slots.Answer.value));
    return answerSlotIsInt && parseInt(intent.slots.Answer.value) < (ANSWER_COUNT + 1) && parseInt(intent.slots.Answer.value) > 0;
}

// ------- Helper functions to build responses -------


function buildSpeechletResponse(title, output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: "PlainText",
            text: output
        },
        card: {
            type: "Simple",
            title: title,
            content: output
        },
        reprompt: {
            outputSpeech: {
                type: "PlainText",
                text: repromptText
            }
        },
        shouldEndSession: shouldEndSession
    };
}

function buildSpeechletResponseWithoutCard(output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: "PlainText",
            text: output
        },
        reprompt: {
            outputSpeech: {
                type: "PlainText",
                text: repromptText
            }
        },
        shouldEndSession: shouldEndSession
    };
}

function buildResponse(sessionAttributes, speechletResponse) {
    return {
        version: "1.0",
        sessionAttributes: sessionAttributes,
        response: speechletResponse
    };
}

